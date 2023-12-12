import React, { useState, useCallback } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import {
  LegacyCard,
  Page,
  Button,
  ResourceList,
  ResourceItem,
  LegacyStack,
  ButtonGroup,
  Text,
  Badge,
  FormLayout,
  TextField,
  Modal,
  Form,
} from "@shopify/polaris";

function Todo() {
  const URL = "http://localhost:5000/api";
  const { data: todos, setData: setTodos } = useFetchApi(`${URL}/todos`);

  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const handleCreateTodo = async (value) => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: value,
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
      setActive(false);
      setValue("");
    }
  };

  const handleCompleteTodo = async (todo, idTodo) => {
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

  const handleDeleteTodo = async (idTodo) => {
    try {
      console.log(`Deleting ${idTodo}`);
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

  return (
    <Page
      title="Todoes"
      primaryAction={
        <Button variant="primary" onClick={toggleModal}>
          Create todo
        </Button>
      }
    >
      <Modal
        open={active}
        onClose={toggleModal}
        title="Create todo"
        primaryAction={{
          content: "Create",
          onAction: () => {
            handleCreateTodo(value);
          },
        }}
      >
        <Modal.Section>
          <Form
            noValidate
            onSubmit={() => {
              handleCreateTodo(value);
            }}
          >
            <FormLayout>
              <TextField
                value={value}
                onChange={handleChange}
                label="Todo"
                type="text"
                autoComplete="off"
                placeholder="Type todo..."
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>

      <LegacyCard>
        <ResourceList
          resourceName={resourceName}
          items={todos}
          selectedItems={selectedItems}
          onSelectionChange={handleSelected}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          renderItem={(item) => (
            <ResourceItem
              id={item.id}
              text={item.text}
              isCompleted={item.isCompleted}
              loading={loading}
            >
              <LegacyStack alignment="center">
                <LegacyStack.Item fill>
                  <Text as="h2" variant="bodyMd">
                    {item.text}
                  </Text>
                </LegacyStack.Item>
                <LegacyStack.Item>
                  {item.isCompleted ? (
                    <Badge tone="success">Done</Badge>
                  ) : (
                    <Badge tone="attention">Pending</Badge>
                  )}
                </LegacyStack.Item>
                <LegacyStack.Item>
                  <ButtonGroup>
                    <Button onClick={() => handleCompleteTodo(item, item.id)}>
                      Complete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleDeleteTodo(item.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </LegacyStack.Item>
              </LegacyStack>
            </ResourceItem>
          )}
        />
      </LegacyCard>
    </Page>
  );
}

export default Todo;
