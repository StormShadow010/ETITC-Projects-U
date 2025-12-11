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

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <p style={{ fontSize: "1.2rem" }}>Cargando usuario...</p>
      </div>
    );
  }

  // ... (imports y useEffect igual)

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px 10px", // Reducido de "30px 20px" a "20px 10px" para dar más espacio arriba y evitar cortes
      }}
    >
      {/* ENCABEZADO - Ahora ocupa 100% ancho sin maxWidth */}
      <div
        style={{
          width: "100%", // Cambiado de maxWidth: "900px" a width: "100%" para ocupar todo el ancho
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
          }}
        >
          Dashboard
        </h1>

        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              margin: "0 auto",
              display: "block",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />
        )}

        <h2 style={{ marginBottom: "12px", fontSize: "1.4rem" }}>
          Bienvenido, {user.displayName}
        </h2>

        <button
          style={{
            padding: "10px 22px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
            marginBottom: "30px",
            transition: "0.3s",
          }}
          onClick={async () => {
            await logout();
            navigate("/");
          }}
          onMouseOver={(e) => (e.target.style.background = "#145ca1")}
          onMouseOut={(e) => (e.target.style.background = "#1976d2")}
        >
          Cerrar sesión
        </button>
      </div>

      {/* TABLERO KANBAN - Cambios abajo para 100% ancho */}
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 0 12px rgba(0,0,0,0.12)",
          margin: "0 auto",
          padding: "5px 0",
        }}
      >
        <h2 style={{ marginBottom: "16px", marginLeft: "10px" }}>
          Tablero Kanban
        </h2>

        <TasksProvider>
          <KanbanBoard />
        </TasksProvider>
      </div>

      {/* Logo - Igual */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          opacity: 0.9,
        }}
      >
        <img
          src="LogoPersonal.png"
          alt="Logo"
          style={{ width: "120px", maxWidth: "30vw" }}
        />
      </div>
    </div>
  );
};
