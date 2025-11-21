import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/authService";
import "../styles/login.css";

export const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log(usr);

      navigate("/dashboard"); // navega al dashboard
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <div className="welcome">
        <h1>Bienvenido</h1>
        <p>
          En esta app podrás gestionar tus tareas de forma sencilla y eficiente.
        </p>
      </div>
      <div className="login-card">
        <h2>Sign in</h2>
        <img className="kanbanIcon" src="assets/kanban.png" alt="KanBan Icon" />

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
