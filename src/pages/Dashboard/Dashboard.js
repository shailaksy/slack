import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import LoginFunction from "../../components/LoginFunction/LoginFunction";
import Header from "../../components/LogoutFunction/LogoutFunction";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Dashboard.css";

const Dashboard = () => {
  const signedInUser = localStorage.getItem("signedInUser");
  const initial = localStorage.getItem(`${signedInUser}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedInUser}-contacts`))
    : [];
  const [contacts, setContacts] = useState(initial);

  return (
    <>
      {signedInUser ? (
        <div className="dashboard">
          <div>
            <Header />
            <Sidebar contacts={contacts} setContacts={setContacts} />
          </div>
          <div className="dashboard-chat">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route
                path=":receiverClass/:id"
                element={<Chat contacts={contacts} setContacts={setContacts} />}
              />
            </Routes>
          </div>
        </div>
      ) : (<LoginFunction />) }
    </>
  );
};

export default Dashboard;
