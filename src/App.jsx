import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';

const messages = [
  { id: 1, title: 'Mow the lawn', isComplete: false },
  { id: 2, title: 'Cook Pasta', isComplete: true },
]

const kBaseUrl = 'http://localhost:5000';

const getAllTasks = () => {
  return axios.get(`${kBaseUrl}/tasks`)
  .then(response => {
    return response.data.map(convertFromAPItoJson);
  })
  .catch (error =>  {
    console.log(error);
  });
};

// const convertFromAPItoJson = (apiTask) => {
//   const { id, title, isComplete, onToggleComplete, onDelete } = apiTask;
//   const newTask = {id, title, isComplete, onToggleComplete, onDelete};
//   return newTask;
// }

const convertFromAPItoJson = (apiTask) => {
  const { id, title, is_complete } = apiTask;
  return { id, title, isComplete: is_complete };
};

const taskApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}`)
  .then(response => {
    return convertFromAPItoJson(response.data);
  })
  .catch(error => {
    console.log(error);
  });
};

const removeTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
  .catch(error => {
    console.log(error)});
}

const App = () => {
  const [taskData, setTaskData] = useState(messages);

  const getTasks = () => {
    return getAllTasks()
    .then(tasks => setTaskData(tasks));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const taskFunc = (id) => {
    return taskApi(id).then(taskResult => {
      setTaskData(taskData => taskData.map(task => {
        if (task.id === taskResult.id) {
          return taskResult;
        } else {
          return task;
        }
      }));
    })
  }

  const toggleTaskCompleteAPI = (task) => {
    const toggle = task.isComplete ? 'not_complete' : 'complete';
    return axios.patch(`${kBaseUrl}/tasks/${task.id}/${toggle}`)
    .then(response => {
      return convertFromAPItoJson(response.data.task);
    })
    .catch(error => {
      console.log(error);
    });
  };


const toggleTaskComplete = (id, isComplete) => {
  const endpoint = isComplete ? `/tasks/${id}/mark_incomplete` : `/tasks/${id}/mark_complete`;
  
  axios.patch(`${kBaseUrl}${endpoint}`)
  .then(() => {
    const updatedTasks = taskData.map((task) =>
      task.id === id ? { ...task, isComplete: !isComplete } : task
  );
  setTaskData(updatedTasks);
})
.catch((error) => {
  console.error('Error to toggling task:', error);
});

 const deleteTask = (id) => {
    return removeTaskApi(id).then(() => {
      setTaskData(taskData => taskData.filter(task => task.id !== id));
    });
  };

  // const removeTask = id => {
  //   return removeTaskApi(id)
  //   .then(() => {
  //     setTaskData(taskData => taskData.filter((task) => {
  //       return task.id !== id;})
  //     //   setTaskData(updatedTasks))
  //   })
  // }



 

  // const toggleTaskComplete = (id) => {
  //   const updatedTasks = taskData.map((task) => {
  //     if (task.id === id) {
  //       return { ...task, isComplete: !task.isComplete };
  //     }
  //     return task;
  //   });
  //   setTaskData(updatedTasks);
  // };

  // const deleteTask = (id) => {
  //   const updatedTasks = taskData.filter((task) => task.id !== id);
  //   setTaskData(updatedTasks);
  // };


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
}
export default App;