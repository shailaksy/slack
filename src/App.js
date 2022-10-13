import { Route, Routes } from "react-router-dom";
// import { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import SignUpForm from "./components/SignUpForm";
import Home from './pages/Home/Home';
import SignUp from "./pages/SignUp/SignUp";
import SignedUp from "./pages/SignedUp/SignedUp";
import Login from './pages/Login/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signedup" element={<SignedUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )

//<Route path="/" element={<Home />} />
//<Route path="/signedup" element={<SignedUp />} />
//<Routes>
//<Route path="/signup" element={<SignUp />} />
//</Routes>

}

export default App
