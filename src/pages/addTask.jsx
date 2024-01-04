import React from 'react'
import FormList from '../components/FormList';
import { TodoContext } from '../contexts/todoProvider';
const AddTask = () => {
   return (
      <div className='m-auto w-2/4'>
         <FormList />
      </div>
   )
}

export default AddTask