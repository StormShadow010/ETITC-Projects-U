import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "../pages";

export const AppRouter = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </>
  );
};
