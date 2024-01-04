import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import 'Routes' instead of 'Switch'
import TodoProvider from './contexts/todoProvider';
import Home from './pages/home';
import AddTask from './pages/addTask';
// import AddTask from './pages/AddTask'; 

function App() {
  return (
    <Router>
      <TodoProvider> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/addTask" element={<AddTask/>} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
