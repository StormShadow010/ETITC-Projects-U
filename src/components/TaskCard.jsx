// src/components/TaskCard.jsx
import { useState } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTasksContext } from "../viewModel/useTasksContext";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTasksContext();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue({ title: task.title, description: task.description });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    updateTask(task.id, {
      title: values.title,
      description: values.description,
    });
    setIsEditModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Card
        size="small"
        style={{ marginBottom: 8 }}
        actions={[
          <Button
            key="edit"
            icon={<EditOutlined />}
            size="small"
            onClick={handleEdit}
          />,
          <Button
            key="delete"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => deleteTask(task.id)}
          />,
        ]}
      >
        <Card.Meta title={task.title} description={task.description} />
      </Card>

      <Modal
        title="Editar Tarea"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: "Ingresa un título" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar Cambios
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskCard;
