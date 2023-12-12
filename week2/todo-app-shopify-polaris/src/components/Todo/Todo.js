import React, { useState, useCallback } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { LegacyCard, Page, Button, ResourceList } from "@shopify/polaris";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";

function Todo() {
  const URL = "http://localhost:5000/api";
  const { data: todos, setData: setTodos } = useFetchApi(`${URL}/todos`);

  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button variant="primary" onClick={toggleModal}>
      Create todo
    </Button>
  );

  const addTodo = async (text) => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const resp = await res.json();
      if (resp.success) {
        const newData = [...todos, resp.data];
        setTodos(newData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const completeTodo = async (todo, idTodo) => {
    try {
      setLoading(true);
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
      throw new Error(`Failed to complete todo with ID ${idTodo}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (idTodo) => {
    try {
      setLoading(true);
      const resp = await fetch(`${URL}/todos/${idTodo}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      if (data.success) {
        const newTodo = todos.filter((todo) => todo.id !== parseInt(idTodo));
        setTodos(newTodo);
      }
      throw new Error(`Failed to complete todo with ID ${idTodo}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const completeBulk = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${URL}/todos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedItems,
          data: { isCompleted: true },
        }),
      });
      const data = await resp.json();
      if (data.success) {
        const newTodos = todos.map((todo) => {
          if (selectedItems.includes(todo.id)) {
            return {
              ...todo,
              isCompleted: true,
            };
          }
          return todo;
        });
        setTodos(newTodos);
        setSelectedItems([]);
      }
      throw new Error(`Failed to complete bulk todo`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBulk = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${URL}/todos`, {
        method: "DELETE",
        body: selectedItems,
      });
      const data = await resp.json();
      if (data.success) {
        const newTodos = todos.filter(
          (todo) => !selectedItems.includes(todo.id)
        );
        setTodos(newTodos);
        setSelectedItems([]);
      }
      throw new Error(`Failed to complete todo`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: completeBulk,
    },
    {
      content: "Delete",
      onAction: deleteBulk,
    },
  ];

  const bulkActions = [];
  const resourceName = {
    singular: "todo",
    plural: "todos",
  };
  const [value, setValue] = useState("");
  const handleChange = useCallback((value) => setValue(value), []);

  const handleSelected = (selected) => {
    setSelectedItems(selected);
  };

  const handleCreateTodo = () => {
    addTodo(value);
    setActive(false);
    setValue("");
  };
  return (
    <div>
      <TodoModal
        active={active}
        toggleModal={toggleModal}
        handleChange={handleChange}
        handleCreateTodo={handleCreateTodo}
        value={value}
      />
      <Page title="Todoes" primaryAction={activator}>
        <LegacyCard>
          <ResourceList
            resourceName={resourceName}
            items={todos}
            renderItem={(item) => (
              <TodoItem
                item={item}
                loading={loading}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            )}
            selectedItems={selectedItems}
            onSelectionChange={handleSelected}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
          />
        </LegacyCard>
      </Page>
    </div>
  );
}

export default Todo;
