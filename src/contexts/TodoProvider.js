import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: generateUniqueId(), completed: false }]);
  };

  //Function to edit a existing task
  const updateTask = (taskId, updatedTask) => {
    setTasks(currentTasks => 
      currentTasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task)
    );
  };
  

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to update the priority of a task
  const updateTaskPriority = (taskId, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, priority: newPriority } : task
    ));
  };

  // State and function for search functionality (if needed)
  const [searchValue, setSearchValue] = useState('');

  const handleSearchRemove = (event) => {
    setSearchValue(event.target.value);
  };

  // State and function for sorting functionality (if needed)
  const [isSorted, setIsSorted] = useState(false);

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  const sortTasks = () => {

  };

  return (
    <TodoContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      toggleTaskCompletion,
      removeTask,
      updateTaskPriority,
      handleSearchRemove,
      isSorted,
      toggleSort,
      sortTasks,
      searchActions: {
        searchValue,
        handleSearchRemove
      }
    }}>
      {children}
    </TodoContext.Provider>
  );
};

const generateUniqueId = () => {
  // Implement a unique ID generation logic
  return `${Date.now()}-${Math.random()}`;
};

export default TodoProvider;
