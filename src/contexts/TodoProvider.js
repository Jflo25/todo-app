import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
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
  const updateTaskCompletionStatus = (taskId, newStatus) => {
    setTasks(currentTasks => {
        return currentTasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: newStatus };
            }
            return task;
        });
    });
};

//power on function priority + complexity
const sortTasksByPower = () => {
  setTasks(currentTasks => {
    return [...currentTasks].sort((a, b) => {
      if (a.priority === b.priority) {
        return b.complexity - a.complexity; // Sort by complexity if priorities are equal
      }
      return b.priority - a.priority; // Higher priority comes first
    });
  });
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
  const completionPercentage = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
};

const calculateCompletionPercentage = (task) => {
  const completedItems = task.checklistItems.filter(item => item.isCompleted).length;
  return (completedItems / task.checklistItems.length) * 100;
};


  return (
    <TodoContext.Provider value={{
      tasks,
      setTasks,
      addTask,
      updateTask,
      updateTaskCompletionStatus,
      removeTask,
      updateTaskPriority,
      handleSearchRemove,
      isSorted,
      toggleSort,
      sortTasks,
      completionPercentage,
      calculateCompletionPercentage,
      sortTasksByPower,
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
