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

    const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

    // Task manipulation functions
    const addTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: generateUniqueId(), completed: false }]);
    };

    const updateTask = (taskId, updatedTask) => {
        setTasks(currentTasks => 
            currentTasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task)
        );
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const updateTaskPriority = (taskId, newPriority) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, priority: newPriority } : task));
    };

    // Status update function
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

    // Sorting function
    const sortTasksByPower = () => {
        setTasks(currentTasks => {
          return [...currentTasks].sort((a, b) => {
            // sort by priority in descending order
            const priorityDifference = b.priority - a.priority;
            // If priorities are equal, sort by complexity instead 
            return priorityDifference || b.complexity - a.complexity;
          });
        });
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
            completionPercentage,
            calculateCompletionPercentage,
            sortTasksByPower
        }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
