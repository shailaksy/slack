import { Route, Routes } from "react-router-dom";
// import { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import SignUpForm from "./components/SignUpForm";
import Home from "./pages/Home/Home";
import SignedUp from "./pages/SignedUp/SignedUp";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Conversation from "./components/Conversation/Conversation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signedup" element={<SignedUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );

  //<Route path="/dashboard/:channel">
}

export default App;
