import { useContext } from "react";
import { TasksContext } from "./TasksContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("useTasksContext debe usarse dentro de TasksProvider");
  return context;
};
