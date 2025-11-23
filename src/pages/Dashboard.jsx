import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { logout } from "../services/authService";

import KanbanBoard from "../components/KanbanBoard";
import { TasksProvider } from "../viewModel/TasksContextProvider";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        // Creamos un objeto plano
        setUser({
          displayName: u.displayName,
          photoURL: u.photoURL,
          email: u.email,
        });
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, [navigate]);

  // Mostrar un "Cargando..." mientras el usuario llega
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <h1>Dashboard</h1>

      {/* Avatar solo si existe */}
      {user && user.photoURL && (
        <img
          src={user.photoURL}
          alt={user.displayName}
          style={{
            borderRadius: "50%",
            width: 100,
            height: 100,
            margin: "16px 0",
          }}
        />
      )}

      <h2>Bienvenido, {user.displayName}</h2>

      <button
        style={{
          padding: "8px 16px",
          margin: "16px 0",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#1976d2",
          color: "white",
          cursor: "pointer",
        }}
        onClick={async () => {
          await logout();
          navigate("/");
        }}
      >
        Cerrar sesión
      </button>

      <div style={{ padding: 24, textAlign: "left" }}>
        <h2>Tablero Kanban</h2>
        <TasksProvider>
          <KanbanBoard />
        </TasksProvider>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        <img
          style={{ width: "35%", height: "auto" }}
          src="LogoPersonal.png"
          alt="Logo Personal"
        />
      </div>
    </div>
  );
};
