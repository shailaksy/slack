// import { useEffect, useState } from 'react'
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Dashboard.css";

//import Message from '../../components/Message/Message'
//import Sidebar from '../../components/Sidebar/Sidebar'

const Dashboard = () => {

    const signedInUser = localStorage.getItem("signedInUser");
    const initial = localStorage.getItem(`${signedInUser}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedInUser}-contacts`))
    : [];
    const [contacts, setContacts] = useState(initial);

  return (
    <div className="dashboard">
      <div>
        <Header />
        <Sidebar contacts={contacts} setContacts={setContacts} />
      </div>
      <div className="dashboard-chat">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path=":receiverClass/:id" element={<Chat contacts={contacts} setContacts={setContacts} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
