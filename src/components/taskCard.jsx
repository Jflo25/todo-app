import React, { useContext } from 'react';
import { TodoContext } from '../contexts/todoProvider';
import { useNavigate } from 'react-router-dom';
const TaskCard = ({ taskId }) => {
   const { tasks, toggleTaskCompletion } = useContext(TodoContext); // Assume you have a toggleTaskCompletion function
   const task = tasks.find(t => t.id === taskId);
   const navigate = useNavigate();

   if (!task) return null;

   // Handler for navigating to the edit page
   const handleEditClick = () => {
      navigate(`/edit/${taskId}`);
   };

   // Handler for toggling task completion
   const handleCompletionClick = () => {
      toggleTaskCompletion(taskId);
   };
   return (

      <div className={`mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4 ${task.completed ? 'bg-blue-100' : ''}`}>
         <div className="md:flex md:w-auto justify-between">
            <div className="p-4">
               <div className="text-xl font-bold mb-2 flex justify-between items-center">
                  <span>{task.name}</span>
                  <div>
                     {/* Edit Button */}
                     <button onClick={handleEditClick} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Edit
                        {/* Include your edit icon here */}
                     </button>
                     {/* Complete Checkmark */}
                     <button onClick={handleCompletionClick} className={`text-sm ${task.completed ? 'bg-blue-500' : 'bg-gray-300'} hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r`}>
                        {task.completed ? 'Completed' : 'Complete'}
                        {/* Include your checkmark icon here */}
                     </button>
                  </div>
               </div>
               <div className="text-blue-500 flex items-center mb-1">

                  Due Date: {task.dueDate}
               </div>
               <div className="flex items-center mb-1">
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                     <path d="M12 8c3.31 0 6 2.69 6 6s-6 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path>
                     <path d="M12 8v4l2 2"></path>
                  </svg>
                  Priority: High ({task.priority}/10)
               </div>
               <div className="flex items-center mb-1">
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                     <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                     <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Complexity: High ({task.complexity}/10)
               </div>
               <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-2">
                  <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{ width: `${task.progress}%` }}>
                     {task.progress}%
                  </div>
               </div>
               <div className="flex flex-wrap mt-2">
                  {task.tags.map((tag, index) => (
                     <span key={index} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-2 mb-2">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </div>

   );
};

export default TaskCard;
