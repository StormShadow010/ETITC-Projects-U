// src/components/KanbanBoard.jsx
import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasksContext } from "../viewModel/useTasksContext";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

// Columna Droppable
const DroppableColumn = ({ id, title, tasks, isActive }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 450,
        border: "1px solid #d9d9d9",
        borderRadius: 8,
        padding: 16,
        backgroundColor: isActive ? "#00A3FF" : "#fafafa", // resaltar si está activa
        transition: "background-color 0.2s ease",
      }}
    >
      <h3 style={{ textAlign: "center", textTransform: "capitalize" }}>
        {title}
      </h3>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableTask key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

// Tarea Draggable
const SortableTask = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition || "transform 0.2s ease",
    opacity: isDragging ? 0.5 : 1,
    marginBottom: 8,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
};

const KanbanBoard = () => {
  const { tasks, moveTask } = useTasksContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const columns = {
    por_hacer: tasks.filter((t) => t.status === "por_hacer"),
    en_progreso: tasks.filter((t) => t.status === "en_progreso"),
    terminada: tasks.filter((t) => t.status === "terminada"),
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveColumn(null);
    if (!over) return;

    const overColumnId = over.data?.current?.sortable?.containerId || over.id;
    if (!["por_hacer", "en_progreso", "terminada"].includes(overColumnId))
      return;

    const task = tasks.find((t) => t.id === active.id);
    if (!task || task.status === overColumnId) return;

    moveTask(active.id, overColumnId);
  };

  const onDragOver = (event) => {
    const { over } = event;
    if (!over) return;
    const overColumnId = over.data?.current?.sortable?.containerId || over.id;
    setActiveColumn(overColumnId);
  };

  return (
    <div
      style={{
        padding: 20,
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 20 }}
      >
        Nueva Tarea
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragCancel={() => setActiveColumn(null)}
      >
        <Row gutter={[16, 16]} wrap={true}>
          {Object.entries(columns).map(([status, taskList]) => (
            <Col key={status} span={8}>
              <DroppableColumn
                id={status}
                title={status.replace("_", " ")}
                tasks={taskList}
                isActive={activeColumn === status}
              />
            </Col>
          ))}
        </Row>
      </DndContext>

      <TaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default KanbanBoard;
