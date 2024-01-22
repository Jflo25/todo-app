import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoProvider';
import Form from '../components/Form';
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
