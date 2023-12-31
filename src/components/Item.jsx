import React, { useContext } from 'react';
import TodoContext from '../contexts/TodoProvider'; // Assuming import path

const Item = ({ item }) => {
   const { itemActions } = useContext(TodoContext);

   return (
      <li className=''>
         {/* Display item text, priority, and completion status */}
         <button onClick={() => itemActions.handleToggle(item.id)}>
            {/* Toggle button text */}
         </button>
         <button onClick={() => itemActions.handleRemove(item.id)}>Remove</button>
         {/* Priority controls if applicable */}
      </li>
   );
};

export default Item;
