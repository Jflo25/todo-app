import React from 'react';
import TodoProvider from './contexts/TodoProvider'; // Adjust the import path if necessary
import Home from './pages/home';

function App() {
  return (
    <TodoProvider>
      <div className="">
        <Home />
      </div>
    </TodoProvider>
  );
}

export default App;
