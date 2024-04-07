import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your todo..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
