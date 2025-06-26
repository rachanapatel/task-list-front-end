import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onTaskSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === '') return;

    onTaskSubmit({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};


NewTaskForm.propTypes = {
  onTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;