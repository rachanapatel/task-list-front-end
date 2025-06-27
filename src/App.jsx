import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import axios from 'axios';

const kBaseUrl = 'http://127.0.0.1:5000';

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios.get(`${kBaseUrl}/tasks`)
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

   const handleCreateTask = ({ title }) => {
    axios.post(`${kBaseUrl}/tasks`, { title })
      .then((response) => {
        const newTask = response.data;
        setTaskData(prev => [...prev, newTask]);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  }; 

  // const toggleTaskComplete = (id) => {
  //   const updatedTasks = taskData.map((task) => {
  //     if (task.id === id) {
  //       return { ...task, isComplete: !task.isComplete };
  //     }
  //     return task;
  //   });
  //   setTaskData(updatedTasks);
  // };

  const toggleTaskComplete = (id, isComplete) => {
    const status = isComplete ? `/mark_incomplete` : `/mark_complete`;
    axios.patch(`${kBaseUrl}/tasks/${id}${status}`)
      .then(() => {
        const updatedTasks = taskData.map((task) =>
          task.id === id ? { ...task, isComplete: !isComplete } : task
        );
        setTaskData(updatedTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // const deleteTask = (id) => {
  //   const updatedTasks = taskData.filter((task) => task.id !== id);
  //   setTaskData(updatedTasks);
  // };


  const deleteTask = (id) => {
    axios.delete(`${kBaseUrl}/tasks/${id}`)
      .then(() => {
        const updatedTasks = taskData.filter((task) => task.id !== id);
        setTaskData(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm onTaskSubmit={handleCreateTask} />
        <TaskList
          tasks={taskData}
          onToggleComplete={toggleTaskComplete}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );

};
export default App;