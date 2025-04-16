import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login_screen from "./components/auth/Login_screen";
import ExternUser from "./components/externUser/ExternUser_screen";
import ExternUserVisita from "./components/externUser/ExternUserHome/ExternUserVisita";
import SolicitacaoProjeto from "./components/externUser/ExternUser_components/SolicitacaoProject"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login_screen />} />
        <Route path="/user" element={<ExternUser />} />
        <Route path="/userVisita" element={<ExternUserVisita />} />
        <Route path="/userSolicitar" element={<SolicitacaoProjeto/>} />
      </Routes>
    </Router>
  );
}

export default App;
