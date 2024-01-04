import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/todoProvider';
import Priority from './priority'; // Import the Priority component

const Form = ({ onSaveTask }) => {
   const [taskName, setTaskName] = useState('');
   const [priority, setPriority] = useState('1');
   const [complexity, setComplexity] = useState('1');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');
   const [checklistItems, setChecklistItems] = useState([]);
   const [tags, setTags] = useState([]);
   const [newChecklistItem, setNewChecklistItem] = useState('');
   const [newTag, setNewTag] = useState('');

   const priorityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   const complexityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   //TIME FUNCTIONS
   const handleDueDateChange = (e) => {
      const newDate = e.target.value;
      // Add validation here if needed
      setDueDate(newDate);
   };
   const handleDueTimeChange = (e) => {
      const newTime = e.target.value;
      // Add validation here if needed
      setDueTime(newTime);
   };


   const handleSubmit = (e) => {
      e.preventDefault();
      if (taskName.trim()) {
         onSaveTask(taskName);
         setTaskName('');
      }
      const newTask = {
         name: taskName,
         priority,
         complexity,
         dueDate,
         dueTime,
         checklistItems,
         tags,
      };
      onSaveTask(newTask); // This function will handle task saving logic
      // Reset form fields if needed
   };

   const handleAddChecklistItem = () => {
      setChecklistItems([...checklistItems, newChecklistItem]);
      setNewChecklistItem('');
   };

   const handleAddTag = () => {
      setTags([...tags, newTag]);
      setNewTag('');
   };

   return (

      <div className="container text-center mt-10 h-3/4 ">
         <div className="header text-center flex ">
            <button className="return-icon">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 inline-block mr-2"
               >
                  <path
                     fillRule="evenodd"
                     d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                     clipRule="evenodd"
                  />
               </svg>
            </button>
            <h1 className='text-center w-1/4 m-auto'>Add Task</h1>
         </div>

         <p className='text-left'>Task Name</p>
         <form onSubmit={handleSubmit} className='text-left'>
            {/* INPUT TASK */}
            <input
               type="text"
               placeholder="Name of Task... "
               value={taskName}
               onChange={(e) => setTaskName(e.target.value)}
               className="rounded-lg border-gray-300 border p-2"
            />
            {/* PRIORITIY OF TASK */}
            <div className='task-priority'>
               <label>Priority:</label>
               <div className="flex">
                  {priorityOptions.map((option) => (
                     <button
                        key={option}
                        type="button"
                        className={`flex-grow font-medium rounded-full py-2 w-1/12 text-1xl mx-1 ${priority === option.toString() ? 'bg-blue-400' : 'bg-blue-200'
                           }`}
                        onClick={() => setPriority(option.toString())}
                     >
                        {option}
                     </button>
                  ))}
               </div>
            </div>
            {/* COMPLEXITY OF TASK */}
            <div className='task-complexity'>
               <label> Select Complexity Level</label>
               <div className="flex">
                  {complexityOptions.map((option) => (
                     <button
                        key={option}
                        type="button"
                        className={`flex-grow font-medium rounded-full py-2 w-1/12 text-1xl mx-1 ${complexity === option.toString() ? 'bg-blue-400' : 'bg-blue-200'
                           }`}
                        onClick={() => setComplexity(option.toString())}
                     >
                        {option}
                     </button>
                  ))}
               </div>
            </div>
            <div className="task-due-dates flex justify-between">
               <div className="due-date">
                  <h3>Select Due Date</h3>
                  <input
                     type="text"
                     placeholder="Due Date (DD/MM/YY)"
                     value={dueDate}
                     onChange={handleDueDateChange}
                     className="rounded-lg border-gray-300 border p-2"
                  />
               </div>
               <div className="time">
                  <h3>Select Time</h3>
                  <div className="display-time">
                     <input
                        type="text"
                        placeholder="Due Time (HH:MM)"
                        value={dueTime}
                        onChange={handleDueTimeChange}
                        className="rounded-lg border-gray-300 border p-2"
                     />
                  </div>
               </div>
            </div>
            <button type="submit" className="...">
               Save Task
            </button>
         </form>

      </div>
   );
};

export default Form;
