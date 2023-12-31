import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoProvider'; // Import useContext and TodoContext
import FormList from '../components/FormList';

const Home = () => {
   const { sortList, toggleSort } = useContext(TodoContext); // Use useContext to access TodoContext
   const sortedList = sortList();



   return (
      <div className="home-Container">
         <FormList handleSubmit={handleSubmit} />
         <button onClick={toggleSort}>Sort by Priority</button>
      </div>
   );
};

export default Home;
