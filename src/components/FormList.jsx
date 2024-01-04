import React, { useContext } from 'react';
import List from './List';
import Form from './Form';
import { TodoContext } from '../contexts/todoProvider';

const FormList = () => {
   const {
      list,
      itemActions,
      priorityActions,
      searchActions,
      toggleSort,
      handleSubmit
   } = useContext(TodoContext);

   return (
      <div className="form-list">
         <Form onSubmit={handleSubmit} /> // Pass handleSubmit from context or a custom hook
         <List list={list} {...itemActions} />
         <form onSubmit={searchActions.handleSubmitRemove}>
            <input
               type="search"
               placeholder="Remove item from list..."
               value={searchActions.searchValue}
               onChange={searchActions.handleSearchRemove}
            />
         </form>
      </div>
   );
};

export default FormList;