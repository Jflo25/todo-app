import React from 'react';
import Item from './Item'; // Assuming Item is in the same directory

const List = ({ list, handleToggle, handleRemove, handlePriority }) => {
   return (
      <ul>
         {list.map((item) => (
            <Item
               key={item.id}
               item={item}
               handleToggle={handleToggle}
               handleRemove={handleRemove}
               handlePriority={handlePriority}
            />
         ))}
      </ul>
   );
};

export default List;
