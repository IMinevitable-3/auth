import { useState } from "react";
import { Index } from "./pages/index";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {RequireAuth} from './pages/RequireAuth'
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element = {<RequireAuth/>}>

          <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
