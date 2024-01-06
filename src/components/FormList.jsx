import React, { useContext } from 'react';
import List from './List';
import Form from './form';
import { TodoContext } from '../contexts/todoProvider';

const FormList = () => {
   const {
      handleSubmit
   } = useContext(TodoContext);

   return (
      <div className="form-list">
         <Form onSubmit={handleSubmit} />
      </div>
   );
};

export default FormList;