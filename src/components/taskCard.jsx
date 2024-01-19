import React, { useContext } from 'react';
import { TodoContext } from '../contexts/todoProvider';
import { useNavigate } from 'react-router-dom';
import { PencilAltIcon, CheckCircleIcon, CalendarIcon, ArrowUpIcon, ArrowsExpandIcon } from '@heroicons/react/outline';

const TaskCard = ({ taskId }) => {
   const { tasks, toggleTaskCompletion } = useContext(TodoContext);
   const task = tasks.find(t => t.id === taskId);
   const navigate = useNavigate();

   if (!task) return null;

   const handleEditClick = (e) => {
      e.stopPropagation(); // Prevents card click action when clicking on edit button
      navigate(`/edit/${taskId}`);
   };

   const handleCompletionClick = (e) => {
      e.stopPropagation(); // Prevents card click action when clicking on complete button
      toggleTaskCompletion(taskId);
   };

   const handleCardClick = () => {
      navigate(`/task/${taskId}`);
   };

   return (
      <div className={`mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full p-4 ${task.completed ? 'bg-blue-100' : ''}`} onClick={handleCardClick}>
         <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
               <span className="text-xl font-bold text-gray-900 block truncate">{task.name}</span>
               <div className="flex items-center text-blue-500">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Due Date: {task.dueDate}</span>
               </div>
               <div className="flex items-center">
                  <ArrowUpIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Priority: High ({task.priority}/10)</span>
               </div>
               <div className="flex items-center mb-2">
                  <ArrowsExpandIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Complexity: High ({task.complexity}/10)</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
               </div>
               <div className="flex flex-wrap mt-2">
                  {task.tags.map((tag, index) => (
                     <span key={index} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-2 mb-2">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
            <div className="flex-shrink-0 pr-4 mb-auto">
               <div className="flex space-x-2">
                  {/* Edit Button */}
                  <button onClick={handleEditClick} className="text-gray-400 hover:text-gray-500 bg-gray-200 rounded-full p-2 ">
                     <PencilAltIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {/* Complete Checkmark */}
                  <button onClick={handleCompletionClick} className={`${task.completed ? 'bg-blue-500' : 'bg-gray-200'} hover:bg-blue-600 rounded-full p-2`}>
                     <CheckCircleIcon className="h-4 w-4 text-blue" aria-hidden="true" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TaskCard;