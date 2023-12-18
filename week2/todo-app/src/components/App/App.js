import React from "react";
import "./App.css";
import useFetchApi from "../../hooks/useFetchApi";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import fetchApi from "../../helpers/api/fetchApi";

function App() {
  const { data: todos, setData: setTodos } = useFetchApi(`todos`);

  const addTodo = async (text) => {
    const res = await fetchApi({
      url: "todos",
      method: "POST",
      body: { text: value },
    });
    if (res.success) {
      setTodos([...todos, { id: res.data, text: value }]);
    }
  };

  const completeTodo = async (todo, index, idTodo) => {
    try {
      const res = await fetchApi({
        url: `todo/${idTodo}`,
        method: "PUT",
        body: { isCompleted: todo.isCompleted === true ? false : true },
      });
      if (res.success) {
        setTodos((prevTodoes) => {
          return prevTodoes.map((todo) => {
            if (todo.id === idTodo) {
              return {
                ...todo,
                isCompleted: true,
              };
            }
            return todo;
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeTodo = async (index, idTodo) => {
    try {
      const res = await fetchApi({
        url: `todo/${idTodo}`,
        method: "DELETE",
      });
      if (res.success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== parseInt(idTodo)));
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
