import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        className="input"
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
export default TodoForm;
