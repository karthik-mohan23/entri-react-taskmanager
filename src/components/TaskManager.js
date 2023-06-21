import { useState } from "react";

const TaskManager = () => {
  // to store input value
  const [inputValue, setInputValue] = useState("");

  // creating an array to store input values
  const [tasks, setTasks] = useState([]);

  // to add input value to an array
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.length === 0) {
      return;
    }
    setTasks([
      {
        content: inputValue,
        isComplete: false,
        isEditing: false,
      },
      ...tasks,
    ]);
    // reset input field
    setInputValue("");
  };

  // to delete task from array
  const handleDeleteTask = (taskId) => {
    const deleteTask = tasks.filter((task, index) => index !== taskId);
    // tasks.splice(taskId, 1);
    setTasks(deleteTask);
  };

  // to mark completion of task
  const handleComplete = (taskId) => {
    tasks[taskId].isComplete = !tasks[taskId].isComplete;
    setTasks([...tasks]);
  };

  // to edit task
  const handleEdit = (taskId) => {
    tasks[taskId].isEditing = true;
    setTasks([...tasks]);
  };

  //   to update value
  //   const updateValue = (taskId, newValue) => {
  //     tasks[taskId].content = newValue;
  //     setTasks([...tasks]);
  //   };
  const updateValue = (taskId, newValue) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskId].content = newValue;
    setTasks(updatedTasks);
  };

  // to save updated value
  const saveUpdatedValue = (taskId) => {
    tasks[taskId].isEditing = false;
    setTasks([...tasks]);
  };

  return (
    <div className="container">
      {/* container to add tasks */}

      <form onSubmit={handleAddTask} className="add-task">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="add-input"
          autoFocus
          autoComplete="off"
          maxLength={25}
        />
        <button className="add-btn">Add</button>
      </form>
      {/* container to show tasks */}

      <div className="main-task-container">
        {tasks
          .sort((a, b) => (a.isComplete ? 1 : -1) - (b.isComplete ? 1 : -1))
          .map((task, index) => (
            <div key={index} className="tasks-container">
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => handleComplete(index)}
              />
              {
                // task needs to be updated or not
                // if task need to be updated
                task.isEditing ? (
                  <div className="save-flex">
                    <div>
                      <input
                        value={task.content}
                        onChange={(e) => updateValue(index, e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => saveUpdatedValue(index)}
                        className="save-btn">
                        Save
                      </button>
                    </div>
                  </div>
                ) : // if task doesn't need to be updated
                // task completed or not
                task.isComplete ? (
                  // if task is completed

                  <h2>
                    <del>{task.content}</del>
                  </h2>
                ) : (
                  // if task is not completed
                  <>
                    <h2>{task.content}</h2>
                    <button
                      onClick={() => handleEdit(index)}
                      className="edit-btn">
                      Edit
                    </button>
                  </>
                )
              }
              <button
                onClick={() => handleDeleteTask(index)}
                className="delete-btn">
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default TaskManager;
