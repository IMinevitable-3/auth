import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Layout } from "./pages/layout";
import { Index } from "./pages/index";
import { Oops } from "./pages/404";
import { RequireAuth } from "./pages/RequireAuth";
import { Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Oops />} />
      </Route>
    </Routes>
  );
}
