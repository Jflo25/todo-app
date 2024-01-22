import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoProvider from './contexts/TodoProvider';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask'; // Make sure the file name and import name are correct
import TaskDetails from './pages/TaskDetails'; // Make sure the file name and import name are correct

function App() {
  return (
    <Router>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/edit/:taskId" element={<EditTask />} /> {/* Route for editing a task */}
          <Route path="/task/:taskId" element={<TaskDetails />} /> {/* Route for viewing task details */}
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
