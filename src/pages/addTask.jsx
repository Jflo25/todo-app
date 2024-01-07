import React from 'react'

import { TodoContext } from '../contexts/todoProvider';
import FormList from '../components/FormList';
const AddTask = () => {
   return (
      <div className='m-auto w-2/4'>
         <FormList />
      </div>
   )
}

export default AddTask