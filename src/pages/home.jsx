import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../contexts/todoProvider';
import List from '../components/List';
import SortTask from '../components/sortTask';
import FilterTask from '../components/filterTask';

const Home = () => {
   const { searchActions, tasks } = useContext(TodoContext);
   const navigate = useNavigate();

   const [selectedTag, setSelectedTag] = useState('');

   // Collect all unique tags from tasks
   const allTags = [...new Set(tasks.flatMap(task => task.tags))];

   // Filter tasks based on the selected tag
   const filteredTasks = selectedTag
      ? tasks.filter(task => task.tags.includes(selectedTag))
      : tasks;

   const handleFilterSelect = (tag) => {
      setSelectedTag(tag);
   };

   const navigateToAddTask = () => {
      navigate('/addTask');
   };

   return (
      <div className="home-container w-2/4 m-auto">
         <input
            type="search"
            placeholder="Search tasks..."
            value={searchActions.searchValue}
            onChange={searchActions.handleSearchRemove}
            className="w-full bg-gray-200 h-12 px-4 rounded-full mb-4"
         />

         <div className="dropdown mb
-4">
            <div className="flex justify-between">
               <SortTask />
               <FilterTask tags={allTags} onFilterSelect={handleFilterSelect} />
            </div>
         </div>
         {/* Passing the IDs of filtered tasks to the List component */}
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