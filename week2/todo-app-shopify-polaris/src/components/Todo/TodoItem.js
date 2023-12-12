import React from "react";
import { Button, Badge, ResourceItem, Text } from "@shopify/polaris";

function TodoItem({ item, loading, completeTodo, removeTodo }) {
  const { id, text, isCompleted } = item;

  return (
    <ResourceItem
      id={id}
      text={text}
      isCompleted={isCompleted}
      loading={loading}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Text as="h2" variant="bodyMd">
            {item.text}
          </Text>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ justifyItems: "center" }}>
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

export default TodoItem;
