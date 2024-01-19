import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleIcon, PencilAltIcon, ArrowLeftIcon, TrashIcon, RefreshIcon } from '@heroicons/react/outline';

const TaskDetailsCard = () => {
   const { taskId } = useParams();
   const navigate = useNavigate();

   const [task, setTask] = useState({
      name: 'name of task1',
      dueDate: 'February 25th 2030, 12:00 AM',
      priority: 8,
      complexity: 8,
      completion: 0,
      checklist: ['checklist item 1']
   });

   const handleDelete = () => {
      console.log('Delete task logic here');
   };

   const handleRepeat = () => {
      console.log('Repeat task logic here');
   };

   // Navigate to home page
   const navigateToHome = () => {
      navigate('/');
   };

   // Navigate to edit task page
   const navigateToEditTask = () => {
      navigate(`/edit/${taskId}`);
   };

   return (
      <div className="container mx-auto mt-10 h-4/5">
         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold mb-2 text-center">Task Details</h1>
            <div className="flex items-center justify-between mb-4">
               <ArrowLeftIcon className="h-5 w-5 text-gray-600 cursor-pointer" onClick={navigateToHome} />
               <PencilAltIcon className="h-5 w-5 text-gray-600 cursor-pointer" onClick={navigateToEditTask} />
            </div>
            <h1 className="text-xl font-bold mb-2">{task.name}</h1>
            <div className="mb-4">
               <div className="text-sm text-gray-700">Due Date: {task.dueDate}</div>
               <div className="text-sm text-gray-700">Priority: High ({task.priority}/10)</div>
               <div className="text-sm text-gray-700">Complexity: High ({task.complexity}/10)</div>
               <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${task.completion}%` }}></div>
               </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">Checklist for subtasks</h2>
            {task.checklist.map((item, index) => (
               <div key={index} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{item}</span>
                  <CheckCircleIcon className="h-5 w-5 text-gray-600" />
               </div>
            ))}
            <div className="flex justify-between mt-4">
               <button
                  onClick={handleRepeat}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
               >
                  <RefreshIcon className="h-5 w-5 mr-2" />
                  Repeat Task
               </button>
               <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
               >
                  <TrashIcon className="h-5 w-5 mr-2" />
                  Delete Task
               </button>
            </div>
         </div>
      </div>
   );
};

export default TaskDetailsCard