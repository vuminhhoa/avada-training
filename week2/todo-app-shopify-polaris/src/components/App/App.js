import React, { useState, useCallback } from "react";
import "./App.css";
import useFetchApi from "../../hooks/useFetchApi";
import {
  AppProvider,
  LegacyCard,
  FormLayout,
  Frame,
  Modal,
  Page,
  TextField,
  TopBar,
  Button,
  Badge,
  ResourceList,
  ResourceItem,
  Form,
  Text,
} from "@shopify/polaris";
function App() {
  const URL = "http://localhost:5000/api";
  const { data: todos, setData: setTodos } = useFetchApi(`${URL}/todos`);

  const [selectedItems, setSelectedItems] = useState([]);
  const [active, setActive] = useState(false);
  const toggleModal = useCallback(() => setActive((active) => !active), []);
  const [loading, setLoading] = useState(false);

  const activator = (
    <Button variant="primary" onClick={toggleModal}>
      Create todo
    </Button>
  );

  const addTodo = async (text) => {
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
  };

  const completeTodo = async (todo, idTodo) => {
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

      if (!resp.ok) {
        throw new Error(`Failed to complete todo with ID ${idTodo}`);
      }

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

  const removeTodo = async (idTodo) => {
    try {
      const resp = await fetch(`${URL}/todos/${idTodo}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error(`Failed to complete todo with ID ${idTodo}`);
      }

      const newTodo = todos.filter((todo) => todo.id !== parseInt(idTodo));
      setTodos(newTodo);
    } catch (e) {
      console.error(e);
    }
  };
  const logo = {
    width: 150,
    topBarSource: "https://cdn1.avada.io/logo/avada_logo_final_color.png",
  };
  const userMenuMarkup = <TopBar.UserMenu name="HoaVM" initials="H" />;

  const topBarMarkup = (
    <TopBar showNavigationToggle userMenu={userMenuMarkup} />
  );

  const completeBulk = async () => {
    try {
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
      }

      setSelectedItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBulk = async () => {
    try {
      const resp = await fetch(`${URL}/todos`, {
        method: "DELETE",
        body: selectedItems,
      });
      if (!resp.ok) {
        throw new Error(`Failed to complete todo`);
      }

      const newTodos = todos.filter((todo) => !selectedItems.includes(todo.id));
      setTodos(newTodos);
      setSelectedItems([]);
    } catch (error) {
      console.error(error);
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
    <div style={{ height: "500px" }}>
      <AppProvider
        i18n={{
          Polaris: {
            Avatar: {
              label: "Avatar",
              labelWithInitials: "Avatar with initials {initials}",
            },
            ContextualSaveBar: {
              save: "Save",
              discard: "Discard",
            },
            TextField: {
              characterCount: "{count} characters",
            },
            TopBar: {
              toggleMenuLabel: "Toggle menu",

              SearchField: {
                clearButtonLabel: "Clear",
                search: "Search",
              },
            },
            Modal: {
              iFrameTitle: "body markup",
            },
            Frame: {
              skipToContent: "Skip to content",
              navigationLabel: "Navigation",
              Navigation: {
                closeMobileNavigationLabel: "Close navigation",
              },
            },
          },
        }}
      >
        <Modal
          activator={activator}
          open={active}
          onClose={toggleModal}
          title="Create todo"
          primaryAction={{
            content: "Create",
            onAction: () => {
              addTodo(value);
              setActive(false);
              setValue("");
            },
          }}
        >
          <Modal.Section>
            <Form
              noValidate
              onSubmit={() => {
                addTodo(value);
                setActive(false);
                setValue("");
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
        <Frame logo={logo} topBar={topBarMarkup}>
          <Page title="Todoes" primaryAction={activator}>
            <LegacyCard>
              <ResourceList
                resourceName={resourceName}
                items={todos}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={handleSelected}
                promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}
              />
            </LegacyCard>
          </Page>
        </Frame>
      </AppProvider>
    </div>
  );
  function renderItem(item) {
    const { id, text, isCompleted } = item;
    return (
      <ResourceItem id={id} text={text} isCompleted={isCompleted}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text as="h2" variant="bodyMd">
              {item.text}
            </Text>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div
              style={{
                justifyItems: "center",
              }}
            >
              {item.isCompleted ? (
                <Badge tone="success">Done</Badge>
              ) : (
                <Badge tone="attention">Pending</Badge>
              )}
            </div>

            <Button onClick={() => completeTodo(item, id)}>Complete</Button>
            <Button variant="primary" onClick={() => removeTodo(id)}>
              Delete
            </Button>
          </div>
        </div>
      </ResourceItem>
    );
  }
}

export default App;
