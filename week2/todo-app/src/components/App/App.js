import React from "react";
import "./App.css";
import useFetchApi from "../../hooks/useFetchApi";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";

function App() {
  const URL = "http://localhost:5000/api";
  const { data: todos, setData: setTodos } = useFetchApi(`${URL}/todos`);

  const addTodo = async (text) => {
    const res = await fetch(`${URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });
    const data = await res.json();
    if (data.success) {
      const newData = [...todos, data.data];
      setTodos(newData);
    }
  };

  const completeTodo = async (todo, index, idTodo) => {
    try {
      const resp = await fetch(`${URL}/todos/${idTodo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          isCompleted: true,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        const newTodo = todos.map((todo) => {
          if (todo.id === idTodo) {
            return {
              ...todo,
              isCompleted: true,
            };
          }
          return todo;
        });
        setTodos(newTodo);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeTodo = async (index, idTodo) => {
    try {
      const resp = await fetch(`${URL}/todos/${idTodo}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      if (data.success) {
        const newTodo = todos.filter((todo) => todo.id !== parseInt(idTodo));
        setTodos(newTodo);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            idTodo={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
export default App;
