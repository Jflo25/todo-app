import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TodoContext } from '../contexts/todoProvider';

const EditTaskCard = () => {

   const { taskId } = useParams();
   const { tasks, updateTask } = useContext(TodoContext);
   const navigate = useNavigate();
   const taskToEdit = tasks.find(task => task.id === taskId);
   const initialTagsString = taskToEdit?.tags.join(', ') || '';

   // State declarations
   const [taskName, setTaskName] = useState(taskToEdit?.name || '');
   const [priority, setPriority] = useState(taskToEdit?.priority || '1');
   const [complexity, setComplexity] = useState(taskToEdit?.complexity || '1');
   const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || '');
   const [dueTime, setDueTime] = useState(taskToEdit?.dueTime || '');
   const [checklistItems, setChecklistItems] = useState(taskToEdit?.checklistItems || []);
   const [tags, setTags] = useState(taskToEdit?.tags || []);
   const [newChecklistItem, setNewChecklistItem] = useState('');
   const [newTag, setNewTag] = useState('');
   const [isFormValid, setIsFormValid] = useState(false);
   const [tagInput, setTagInput] = useState(initialTagsString);

   // Utility functions
   const validTaskName = taskName => taskName.trim() !== '';
   const validDueDate = dueDate => /^\d{4}-\d{2}-\d{2}$/.test(dueDate);
   const validTime = dueTime => /^\d{2}:\d{2}$/.test(dueTime);



   // Update form validity
   useEffect(() => {
      const isValid = validTaskName(taskName) &&
         (!dueDate || validDueDate(dueDate)) &&
         (!dueTime || validTime(dueTime));
      setIsFormValid(isValid);
   }, [taskName, dueDate, dueTime]);

   // Event handlers
   const handleTaskNameChange = e => setTaskName(e.target.value);
   const handleDueDateChange = e => setDueDate(e.target.value);
   const handleDueTimeChange = e => setDueTime(e.target.value);
   const handlePriorityChange = option => setPriority(option.toString());
   const handleComplexityChange = option => setComplexity(option.toString());
   const handleAddChecklistItem = () => {
      if (newChecklistItem.trim() !== '') {
         setChecklistItems([...checklistItems, newChecklistItem]);
         setNewChecklistItem('');
      }
   };
   const handleAddTag = () => {
      setTags([...tags, newTag]);
      setNewTag('');
   };
   const handleTagInputChange = e => {
      setTagInput(e.target.value);
   };
   const removeChecklistItem = index => {
      const newChecklistItems = checklistItems.filter((_, i) => i !== index);
      setChecklistItems(newChecklistItems);
   };

   // The rest of the handlers remain largely the same but adapted for editing
   const handleSaveChanges = (e) => {
      e.preventDefault();

      // Perform validation checks
      if (!validTaskName(taskName)) {
         alert(`please enter a valid task name`);
         return;
      }
      if (dueDate && !validDueDate(dueDate)) {
         alert('Please enter a valid due date.');
         return;
      }
      if (dueTime && !validTime(dueTime)) {
         alert('Please enter a valid due time.');
         return;
      }
      // Split tag input string into an array
      const updatedTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);

      // Construct the updated task object
      const updatedTask = {
         ...taskToEdit,
         name: taskName,
         priority,
         complexity,
         dueDate,
         dueTime,
         checklistItems,
         tags: updatedTags,

      };

      updateTask(taskId, updatedTask); // Implement this function in your context
      navigate('/'); // Redirect to the home page after the update
   };

   const navigateHome = () => {
      navigate('/');
   };

   // Options for priority and complexity
   const priorityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   const complexityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   return (
      <div className="container mx-auto mt-10 h-4/5">
         <div className="header text-center flex ">
            <button className="return-icon" onClick={navigateHome}>
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
            <h1 className='text-center font-bold text-2xl m-auto'>Edit Task</h1>
         </div>

         <form onSubmit={handleSaveChanges} className='text-left mt-10'>
            <label className='text-lg font-medium'>Task Name</label>
            <input
               type="text"
               placeholder="Name of Task..."
               className="w-full rounded-full border-gray-300 border p-4 mb-4"
               value={taskName}
               onChange={(e) => setTaskName(e.target.value)}
            />

            {/* Priority Selection */}
            <div className='task-priority mb-4'>
               <label className="block mb-2 text-lg font-medium">Priority:</label>
               <div className="flex justify-center">
                  {priorityOptions.map((option) => (
                     <button
                        key={option}
                        type="button"
                        className={`rounded-full text-center w-7 h-7 bg-blue-100 mx-1 ${priority === option.toString() ? 'bg-blue-300' : ''}`}
                        onClick={() => handlePriorityChange(option)}
                     >
                        {option}
                     </button>
                  ))}
               </div>
            </div>

            {/* Complexity Selection */}
            <div className='task-complexity mb-4'>
               <label className="block mb-2 text-lg font-medium">Select Complexity Level</label>
               <div className="flex justify-center">
                  {complexityOptions.map((option) => (
                     <button
                        key={option}
                        type="button"
                        className={`rounded-full text-center w-7 h-7 bg-blue-100 mx-1 ${complexity === option.toString() ? 'bg-blue-300' : ''}`}
                        onClick={() => handleComplexityChange(option)}
                     >
                        {option}
                     </button>
                  ))}
               </div>
            </div>

            {/* Due Date and Time Inputs */}
            <div className="task-due-dates flex justify-between mb-4">
               <div className="w-full mr-2">
                  <label className="text-lg font-medium block mb-2">Select Due Date</label>
                  <input
                     type="date"
                     placeholder="DD/MM/YY"
                     className="rounded-full border-gray-300 border p-4 w-full"
                     value={dueDate}
                     onChange={handleDueDateChange}
                  />
               </div>
               <div className="w-full ml-2">
                  <label className="text-lg font-medium block mb-2">Select Time</label>
                  <input
                     type="time"
                     placeholder="00:00"
                     className="rounded-full border-gray-300 border p-4 w-full"
                     value={dueTime}
                     onChange={handleDueTimeChange}
                  />
               </div>
            </div>

            {/* Checklist Input */}
            <div className="mb-4 relative">
               <label className='text-lg font-medium block mb-2'>Add Checklist</label>
               <div className="flex items-center border border-gray-300 rounded-full">
                  <input
                     type="text"
                     placeholder="Add checklist item..."
                     className="flex-grow rounded-l-full pl-4  py-4 focus:outline-none"
                     value={newChecklistItem}
                     onChange={(e) => setNewChecklistItem(e.target.value)}
                  />
                  <button
                     type="button"
                     onClick={handleAddChecklistItem}
                     className="bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center text-white mr-2"
                  >
                     <span>+</span>
                  </button>
               </div>
               <ul className="list-disc ml-5 mt-2">
                  {checklistItems.map((item, index) => (
                     <div key={index} className="flex items-center mb-2 bg-gray-100 rounded-full pl-4 pr-2 py-2">
                        <span className="flex-grow">{item}</span>
                        <button
                           onClick={() => removeChecklistItem(index)}
                           className="bg-red-500 rounded-full w-8 h-8 flex justify-center items-center text-white"
                        >
                           <span>X</span> {/* Replace with an SVG or icon if preferred */}
                        </button>
                     </div>
                  ))}
               </ul>
            </div>



            {/* Tag Input */}

            <div className="mb-4">
               <label className='text-lg font-medium'>Tags</label>
               <input
                  type="text"
                  placeholder="Enter tags, separated by commas..."
                  className="rounded-full border-gray-300 border p-4 w-full mt-2"
                  value={tagInput}
                  onChange={handleTagInputChange}
               />
            </div>

            {/* Save Task Button */}
            <div className="text-center">
               <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-4 px-8 rounded-full w-auto"
                  onClick={handleSaveChanges}
               >
                  Save Changes
               </button>
            </div>
         </form>
      </div>
   );
};

export default EditTaskCard;
