import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../contexts/TodoProvider';
import List from '../components/List';
import SortTask from '../components/SortTask';
import FilterTask from '../components/FilterTask';

const Home = () => {
   const { tasks, sortTasksByPower } = useContext(TodoContext);
   const navigate = useNavigate();

   const [selectedTag, setSelectedTag] = useState('');
   const [searchInput, setSearchInput] = useState('');

   // Collect all unique tags from tasks
   const allTags = [...new Set(tasks.flatMap(task => task.tags))];

   // Filter tasks based on tag and search input
   const filteredTasks = tasks.filter(task => {
      const tagFilter = selectedTag ? task.tags.includes(selectedTag) : true;
      const searchFilter = task.name.toLowerCase().includes(searchInput.toLowerCase());
      return tagFilter && searchFilter;
   });

   const handleFilterSelect = (tag) => {
      setSelectedTag(tag);
   };

   const handleSearchChange = (event) => {
      setSearchInput(event.target.value);
   };

   const navigateToAddTask = () => {
      navigate('/addTask');
   };

   return (
      <div className="home-container w-2/4 m-auto mt-10">
         <input
            type="search"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full bg-gray-200 h-12 px-4 rounded-full mb-4"
         />

         <div className="dropdown mb-4">
            <div className="flex justify-between">
               <SortTask />
               <button onClick={sortTasksByPower} className=" power-button inline-flex items-center justify-center w-48 bg-gray-300 h-12 px-4 rounded-full text-lg text-gray-700 font-medium">Power On</button>
               <FilterTask tags={allTags} onFilterSelect={handleFilterSelect} />
            </div>
         </div>
         <List taskIds={filteredTasks.map(task => task.id)} />
         <div className="text-center">
            <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
               onClick={navigateToAddTask}>
               + Add New Task
            </button>
         </div>
      </div>
   );
};

export default Home;
