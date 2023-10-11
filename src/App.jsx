import { useState } from "react";
import { Index } from "./pages/index";
import { Auth } from "./pages/authprovider";
import { accessContext, refreshContext } from "./pages/authprovider";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <accessContext.Provider value={localStorage.getItem("access_token")}>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Index />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </accessContext.Provider>
    </BrowserRouter>
  );
}

export default App;
