import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleIcon, PencilAltIcon, ArrowLeftIcon, TrashIcon, RefreshIcon } from '@heroicons/react/outline';
import { TodoContext } from '../contexts/todoProvider';
const TaskDetailsCard = () => {
   const { taskId } = useParams();
   const { tasks, updateTask, removeTask, updateTaskCompletionStatus } = useContext(TodoContext); // Ensure updateTask is imported from TodoContext
   const navigate = useNavigate();

   const [task, setTask] = useState(null);

   useEffect(() => {
      const foundTask = tasks.find(t => t.id === taskId);
      if (foundTask) {
         setTask(foundTask);
      }
   }, [taskId, tasks]);

   if (!task) {
      return <div>Task not found</div>;
   }

   // All code below this line will only run if `task` is not `null`
   const toggleChecklistItem = (index) => {
      const updatedChecklistItems = task.checklistItems.map((item, i) => {
         if (i === index) {
            return { ...item, isCompleted: !item.isCompleted };
         }
         return item;
      });

      const completedItems = updatedChecklistItems.filter(item => item.isCompleted).length;
      const isCompleted = completedItems === updatedChecklistItems.length;

      const updatedTask = {
         ...task,
         checklistItems: updatedChecklistItems,
         completed: isCompleted // Update the task's completion status
      };

      setTask(updatedTask);
      updateTask(task.id, updatedTask); // Update the task globally
      updateTaskCompletionStatus(task.id);// Update completion status
   };

   const completedChecklistItems = task.checklistItems.filter(item => item.isCompleted).length;
   const completionPercentage = (completedChecklistItems / task.checklistItems.length) * 100;


   const handleDeleteTask = () => {
      removeTask(taskId);
      navigate('/'); // Navigate back to home after deletion
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
      <div className="container mx-auto mt-10 h-4/5 w-1/2">
         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-2 text-center">Task Details</h1>
            <div className="flex items-center justify-between mb-4">
               <ArrowLeftIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={navigateToHome} />
               <PencilAltIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={navigateToEditTask} />
            </div>
            <h2 className="text-2xl font-bold mb-2">{task.name}</h2>
            <div className="mb-4">
               <div className="text-lg text-gray-700">Due Date: {task.dueDate}</div>
               <div className="text-lg text-gray-700">Due Time: {task.dueTime}</div>
               <div className="text-lg text-gray-700">Priority: High ({task.priority}/10)</div>
               <div className="text-lg text-gray-700">Complexity: High ({task.complexity}/10)</div>
               <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 my-4">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
               </div>
               <div className="text-lg text-gray-700">{completionPercentage.toFixed(0)}%</div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Checklist for subtasks</h2>
            {task.checklistItems.map((item, index) => (
               <div key={index} className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => toggleChecklistItem(index)}>
                  <span className="text-lg text-gray-700">{item.text}</span> {/* Render the text property */}
                  <CheckCircleIcon className={`h-6 w-6 ${item.isCompleted ? 'text-blue-600' : 'text-gray-600'}`} />
               </div>
            ))}
            <div className="flex justify-center mt-4">

               <button
                  onClick={handleDeleteTask}
                  className="inline-flex items-center px-4 py-2 mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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