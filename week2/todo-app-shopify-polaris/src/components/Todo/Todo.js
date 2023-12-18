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
import fetchApi from "../../helpers/api/fetchApi";

function Todo() {
  const {
    data: todos,
    setData: setTodos,
    loading: loadingFetch,
  } = useFetchApi(`todos`);

  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [active, setActive] = useState(false);
  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const handleCreateTodo = async (value) => {
    try {
      setLoadingCreate(true);
      const res = await fetchApi({
        url: "todos",
        method: "POST",
        body: { text: value },
      });
      if (res.success) {
        setTodos([...todos, { id: res.data, text: value }]);
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
      const res = await fetchApi({
        url: `todo/${idTodo}`,
        method: "PUT",
        body: { isCompleted: todo.isCompleted === true ? false : true },
      });

      if (res.success) {
        setTodos((prev) => {
          return prev.map((todo) => {
            if (todo.id === idTodo) {
              return {
                ...todo,
                isCompleted: todo.isCompleted === true ? false : true,
              };
            }
            return todo;
          });
        });
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
      const res = await fetchApi({
        url: `todo/${idTodo}`,
        method: "DELETE",
      });

      if (res.success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== idTodo));
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
      const res = await fetchApi({
        url: `todos`,
        method: "PUT",
        body: {
          ids: selectedItems,
          data: { isCompleted: true },
        },
      });

      if (res.success) {
        setTodos((prev) =>
          prev.map((todo) => {
            if (selectedItems.includes(todo.id)) {
              return {
                ...todo,
                isCompleted: true,
              };
            }
            return todo;
          })
        );
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
      const res = await fetchApi({
        url: `todos`,
        method: "DELETE",
        body: selectedItems,
      });

      if (res.success) {
        setTodos((prev) =>
          prev.filter((todo) => !selectedItems.includes(todo.id))
        );
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
                      {item.isCompleted ? "Uncomplete" : "Complete"}
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
