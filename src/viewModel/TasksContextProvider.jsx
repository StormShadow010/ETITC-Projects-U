// src/viewModel/TasksProvider.jsx
import React, { useState, useEffect } from "react";
import { TasksContext } from "./TasksContext";
import Task from "../models/Task";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "userTasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return new Task(
          doc.id,
          data.title,
          data.description,
          data.status,
          data.userId
        );
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async (title, description) => {
    if (!user) return;
    await addDoc(collection(db, "userTasks"), {
      title,
      description,
      status: "por_hacer",
      userId: user.uid,
      createdAt: new Date(),
    });
  };

  const updateTask = async (id, updates) => {
    await updateDoc(doc(db, "userTasks", id), updates);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "userTasks", id));
  };

  const moveTask = async (id, newStatus) => {
    await updateTask(id, { status: newStatus });
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
