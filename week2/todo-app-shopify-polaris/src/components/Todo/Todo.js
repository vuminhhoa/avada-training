import React, { useState, useCallback } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import {
  Card,
  Page,
  Button,
  ResourceList,
  ResourceItem,
  ButtonGroup,
  Text,
  Badge,
  FormLayout,
  TextField,
  Modal,
  Form,
  InlineStack,
  EmptyState,
} from "@shopify/polaris";

function Todo() {
  const URL = "http://localhost:5000/api";
  const {
    data: todos,
    setData: setTodos,
    loading: loadingFetch,
  } = useFetchApi(`${URL}/todos`);

  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [active, setActive] = useState(false);
  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const handleCreateTodo = async (value) => {
    try {
      setLoadingCreate(true);
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
        const newData = [...todos, { id: resp.data, text: value }];
        setTodos(newData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCreate(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (idTodo) => {
    try {
      setLoading(true);

      const resp = await fetch(`${URL}/todos/${idTodo}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      if (data.success) {
        const newTodo = todos.filter((todo) => todo.id !== idTodo);
        setTodos(newTodo);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkComplete = async () => {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const promotedBulkActions = [
    {
      content: "Complete",
      onAction: handleBulkComplete,
    },
    {
      content: "Delete",
      onAction: handleBulkDelete,
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
          loading: loadingCreate,
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

      <Card padding="0">
        <ResourceList
          resourceName={resourceName}
          items={todos}
          selectedItems={selectedItems}
          onSelectionChange={handleSelected}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          loading={loadingFetch ? loadingFetch : loading}
          emptyState={
            <EmptyState
              heading="Relax..."
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>You have nothing to do!</p>
            </EmptyState>
          }
          renderItem={(item) => (
            <ResourceItem
              id={item.id}
              text={item.text}
              isCompleted={item.isCompleted}
            >
              <InlineStack blockAlign="center" align="space-between">
                <Text as="h2" variant="bodyMd">
                  {item.text}
                </Text>
                <InlineStack gap="400">
                  {item.isCompleted ? (
                    <Badge tone="success">Done</Badge>
                  ) : (
                    <Badge tone="attention">Pending</Badge>
                  )}
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
                </InlineStack>
              </InlineStack>
            </ResourceItem>
          )}
        />
      </Card>
    </Page>
  );
}

export default Todo;
