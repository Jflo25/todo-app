// List.js
import React from 'react';
import TaskCard from './taskCard'; // Adjust the path as needed

const List = ({ taskIds }) => {
   return (
      <div>
         {taskIds.map(taskId => (
            <TaskCard key={taskId} taskId={taskId} />
         ))}
      </div>
   );
};

export default List;
