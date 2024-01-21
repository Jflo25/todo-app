import React, { useContext } from 'react';
import { TodoContext } from '../contexts/todoProvider';
import Form from '../components/form';
const AddTask = () => {
   const {
      handleSubmit
   } = useContext(TodoContext);

   return (
      <div className="form-list">
         <Form onSubmit={handleSubmit} />
      </div>
   )
}

export default AddTask