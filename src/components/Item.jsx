import React, { useContext } from 'react';
import Priority from './priority';
import { TodoContext } from '../contexts/todoProvider';

const Item = ({ item }) => {
   const { itemActions, priorityActions } = useContext(TodoContext);

   // Handle priority change
   const handlePriorityChange = (e) => {
      const newPriority = e.target.value;
      itemActions.handlePriority(item.id, newPriority);
   };

   return (
      <li className={item.completed ? 'item-completed' : ''}>
         {/* Display item text */}
         <span>{item.value}</span>
         {/* Priority controls */}
         <Priority
            currentPriority={item.priority}
            priorityChange={handlePriorityChange}
         />
         {/* Toggle completion status */}
         <button onClick={() => itemActions.handleToggle(item.id)}>
            {item.completed ? 'Uncomplete' : 'Complete'}
         </button>
         {/* Remove item */}
         <button onClick={() => itemActions.handleRemove(item.id)}>Remove</button>
      </li>
   );
};

export default Item;
