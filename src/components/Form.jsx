import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
   const [inputValue, setInputValue] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
         onSubmit(inputValue);
         setInputValue('');
      }
   };

   return (

      <div className="container text-center">
         <div className="header text-center">Add Task</div>
         <p className=''>Task Name</p>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Name of Task... "
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               className=' '
            />
            <button type="submit">Add</button>
         </form>

      </div>
   );
};

export default Form;
