import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

const App = () => {
  const [taskData, setTaskData] = useState([
    { id: 1, title: 'Mow the lawn', isComplete: false },
    { id: 2, title: 'Cook Pasta', isComplete: true },
  ]);

  const toggleTaskComplete = (id) => {
    const updatedTasks = taskData.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTaskData(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = taskData.filter((task) => task.id !== id);
    setTaskData(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
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