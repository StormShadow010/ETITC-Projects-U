import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { logout } from "../services/authService";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
      else navigate("/"); // redirige si no hay usuario
    });
    return unsubscribe;
  }, [navigate]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
      <img
        src={user.photoURL}
        alt={user.displayName}
        style={{ borderRadius: "50%", width: 100, height: 100 }}
      />
      <h2>Bienvenido, {user.displayName}</h2>
      <button
        onClick={async () => {
          await logout();
          navigate("/");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};
