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
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            placeholder="Add a new todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
         />
         <button type="submit">Add</button>
      </form>
   );
};

export default Form;
