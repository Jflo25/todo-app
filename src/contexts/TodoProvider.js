import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [list, setList] = useState([]);

  // Functions for item actions
  const handleToggle = (itemId) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setList((prevList) => prevList.filter((item) => item.id !== itemId));
  };

  const handlePriority = (itemId, newPriority) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, priority: newPriority } : item
      )
    );
  };

  // Variables for priority management
  const [currentPriority, setCurrentPriority] = useState('');

  const priorityChange = (newPriority) => {
    setCurrentPriority(newPriority);
  };

  // Variables and functions for search and removal
  const [searchValue, setSearchValue] = useState('');

  const handleSearchRemove = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitRemove = (event) => {
    event.preventDefault();
    // Implement logic to remove items based on searchValue
  };

  // Variable for sorting
  const [isSorted, setIsSorted] = useState(false);

  const toggleSort = () => {
    setIsSorted(!isSorted);
    // Implement logic to sort the list based on isSorted
  };

   const sortList = () => {
    let sortList = list.filter((item) => item.value.includes(searchValue));

    if (isSorted === "ascending") {
      sortList.sort((a, b) => a.priority - b.priority);
    } else if (isSorted === "descending") {
      sortList.sort((a, b) => b.priority - a.priority);
    }

    return filteredList;
  };

  return (
    <TodoContext.Provider
      value={{
        list,
        itemActions: {
          handleToggle,
          handleRemove,
          handlePriority,
        
        },
        priorityActions: {
          currentPriority,
          priorityChange,
        },
        searchActions: {
          searchValue,
          handleSearchRemove,
          handleSubmitRemove,
        },
        toggleSort,
        sortList
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};


export default TodoProvider;