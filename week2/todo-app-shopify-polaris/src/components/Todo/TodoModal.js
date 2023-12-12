import React from "react";
import { FormLayout, Modal, TextField, Form } from "@shopify/polaris";
const TodoModal = ({
  active,
  toggleModal,
  handleCreateTodo,
  value,
  handleChange,
}) => {
  return (
    <Modal
      open={active}
      onClose={toggleModal}
      title="Create todo"
      primaryAction={{
        content: "Create",
        onAction: handleCreateTodo,
      }}
    >
      <Modal.Section>
        <Form noValidate onSubmit={handleCreateTodo}>
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
  );
};

export default TodoModal;
