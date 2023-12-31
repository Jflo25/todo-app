import React from 'react';

const Priority = ({ currentPriority, priorityChange }) => {
   const priorityList = [1, 2, 3, 4, 5];
   return (
      <select onChange={priorityChange} value={currentPriority}>
         {priorityList.map((num, index) => (
            <option key={index} value={num}>
               {num}
            </option>
         ))}
      </select>
   );
};

export default Priority;
