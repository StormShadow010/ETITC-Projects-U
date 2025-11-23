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

// Columna Droppable con resaltado
const DroppableColumn = ({ id, title, tasks, isActive }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      data-column-id={id}
      style={{
        minHeight: 800,
        minWidth: 450,
        border: "1px solid #d9d9d9",
        borderRadius: 8,
        padding: 16,
        backgroundColor: isActive ? "#e6f7ff" : "#fafafa", // resaltar si está activa
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
  const [activeColumn, setActiveColumn] = useState(null); // columna resaltada

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
    setActiveColumn(null); // quitar resaltado al soltar
    if (!over) return;

    const overColumnId = over.data?.current?.sortable?.containerId || over.id;
    const validStatuses = ["por_hacer", "en_progreso", "terminada"];
    if (!validStatuses.includes(overColumnId)) return;

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
    <div style={{ padding: 20 }}>
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
        <Row gutter={16}>
          {Object.entries(columns).map(([status, taskList]) => (
            <Col span={8} key={status}>
              <DroppableColumn
                id={status}
                title={status.replace("_", " ")}
                tasks={taskList}
                isActive={activeColumn === status} // pasar si está activa
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
