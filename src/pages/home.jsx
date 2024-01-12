import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../contexts/todoProvider';
import List from '../components/List';

const Home = () => {
   const { sortTask, toggleSort, searchActions, tasks } = useContext(TodoContext);
   const navigate = useNavigate();

   const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
   const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
   const [selectedFilter, setSelectedFilter] = useState('All');

   const filterOptions = ['All', 'Option 1', 'Option 2'];

   const navigateToAddTask = () => {
      navigate('/addTask');
   };

   const toggleSortDropdown = () => {
      setSortDropdownOpen(!sortDropdownOpen);
   };

   const toggleFilterDropdown = () => {
      setFilterDropdownOpen(!filterDropdownOpen);
   };

   const handleSortOptionClick = (option) => {
      toggleSort(option);
      toggleSortDropdown();
   };

   const handleFilterOptionClick = (option) => {
      setSelectedFilter(option);
      toggleFilterDropdown();
   };

   return (
      <div className="home-Container w-2/4 m-auto">
         <input
            type="search"
            placeholder="Search tasks..."
            value={searchActions.searchValue}
            onChange={searchActions.handleSearchRemove}
            className="w-full bg-gray-200 h-12 px-4 rounded-full mb-4"
         />

         <div className="dropdown mb-4">
            <div className="flex justify-between">
               {/* Sort Dropdown */}
               <div className=" flex-1 m-auto">
                  <button
                     onClick={toggleSortDropdown}
                     className="w-48 bg-gray-500 h-12 px-4 rounded-full text-center">
                     Sort
                  </button>
                  {sortDropdownOpen && (
                     <ul className="absolute mt-2 bg-white border border-gray-300 w-48 rounded-lg shadow-lg">
                        <li
                           onClick={() => handleSortOptionClick('option1')}
                           className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                           Option 1
                        </li>
                        <li
                           onClick={() => handleSortOptionClick('option2')}
                           className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                           Option 2
                        </li>
                     </ul>
                  )}
               </div>
               {/* Filter Dropdown */}
               <div className="relative flex-1 mx-2">
                  <button
                     onClick={toggleFilterDropdown}
                     className="w-full bg-gray-400 h-12 px-4 rounded-full text-left text-center">
                     {selectedFilter}
                  </button>
                  {filterDropdownOpen && (
                     <ul className="absolute mt-2 bg-white border border-gray-300 w-48 rounded-lg shadow-lg">
                        {filterOptions.map((option) => (
                           <li
                              key={option}
                              onClick={() => handleFilterOptionClick(option)}
                              className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                              {option}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </div>
         </div>
         <div className="text-center">
            <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
               onClick={navigateToAddTask}>
               + Add New Task
            </button>
         </div>
         <List taskIds={tasks.map(task => task.id)} />
      </div>
   );
};

export default Home;
