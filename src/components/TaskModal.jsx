import { Modal, Form, Input, Button } from "antd";
import { useTasksContext } from "../viewModel/useTasksContext";

const TaskModal = ({ visible, onClose }) => {
  const { addTask } = useTasksContext();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await addTask(values.title, values.description);
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="Nueva Tarea" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Ingresa un título" }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item name="description" label="Descripción">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear Tarea
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
