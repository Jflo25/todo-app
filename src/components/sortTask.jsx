import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/todoProvider';

const SortTask = () => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const { tasks, setTasks } = useContext(TodoContext);

   const sortTasks = (sortOption) => {
      let sortedTasks;
      switch (sortOption) {
         case 'ascDate':
            sortedTasks = [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            break;
         case 'descDate':
            sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
         case 'ascComplexity':
            sortedTasks = [...tasks].sort((a, b) => a.complexity - b.complexity);
            break;
         case 'descComplexity':
            sortedTasks = [...tasks].sort((a, b) => b.complexity - a.complexity);
            break;
         case 'ascPriority':
            sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
            break;
         case 'descPriority':
            sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);
            break;
         default:
            sortedTasks = [...tasks];
      }
      setTasks(sortedTasks);
   };

   const handleSortSelect = (sortOption) => {
      sortTasks(sortOption);
      setDropdownOpen(false);
   };

   const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
   };

   return (
      <div className="relative inline-block text-left z-50">
         <button
            onClick={toggleDropdown}
            className="inline-flex items-center justify-center w-48 bg-gray-300 h-12 px-4 rounded-full text-lg text-gray-700 font-medium"
         >
            Sort
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
         </button>

         {dropdownOpen && (
            <ul className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('default')}>Default</li>
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('ascDate')}>Ascending Date</li>
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('descDate')}>Descending Date</li>
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('ascComplexity')}>Ascending Complexity</li>
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('descComplexity')}>Descending Complexity</li>
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('ascPriority')}>Ascending Priority</li>
               <li className="dropdown-option" role="menuitem" onClick={() => handleSortSelect('descPriority')}>Descending Priority</li>
            </ul>
         )}
      </div>
   );
};

export default SortTask;
