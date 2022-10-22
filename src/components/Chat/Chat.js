import { useEffect, useState } from "react";
// import Message from "../Message/Message";
import "../Chat/Chat.css";
import {
  Outlet,
  useNavigate,
  useParams,
  Routes,
  Route,
} from "react-router-dom";
import Conversation from "../Conversation/Conversation";
import AddMember from "../AddMember/AddMember";

const Chat = ({ contacts, setContacts }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [receivers, setReceivers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [query, setQuery] = useState("");
  const [channelDetails, setChannelDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    await fetch("http://206.189.91.54/api/v1/users", {
      method: "GET",
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setReceivers(result.data);
      });
  };

  const fetchChannelDetails = () => {
    fetch(`http://206.189.91.54/api/v1/channels/${id}`, {
      method: "GET",
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setChannelDetails(result.data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchChannelDetails();
  }, [id]);

  const handleSelectedReceiver = (receiver) => {
    setReceiverEmail(receiver.email);
    setReceiverId(parseInt(receiver.id));
    navigate(`/dashboard/User/${receiver.id}`);
  };

  return (
    <div className="chat">
      <div className="channel-chat-container">
        <div className="channel-chat-name">
          {channelDetails && <h2> {channelDetails.name} </h2>}
          {!channelDetails && <h2> {receiverEmail} </h2>}

          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add
          </button>
        </div>

        <div className="select-user-container">
          {!id && (
            <div>
              <label>Send to:</label>
              <input
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
              />
            </div>
          )}

          <ul>
            {receivers &&
              query !== "" &&
              receivers.map((receiver) => {
                if (!receiver.email.startsWith(query)) return null;
                return (
                  <li
                    onClick={() => {
                      handleSelectedReceiver(receiver);
                      setQuery("");
                    }}
                  >
                    {receiver.email}
                  </li>
                );
              })}
          </ul>

          {/* <select
            className="select-user"
            onChange={(e) => {
              handleSelectedReceiver(e.target.value);
            }}
        > 
            {receivers.map((receiver) => {
              return (
                <option key={receiver.id} value={receiver}>
                  {receiver.email}
                </option>
              );
            })}
          </select> */}
        </div>
      </div>

      <Conversation
        receiverEmail={receiverEmail}
        contacts={contacts}
        setContacts={setContacts}
      />

      {showModal && channelDetails && (
        <AddMember
          channelId={channelDetails.id}
          channelName={channelDetails.name}
          userList={receivers}
        />
      )}

      {showModal && channelDetails && <div className="backdrop" onClick={() => {setShowModal(false)}}></div>}
    </div>
  );
};

export default Chat;
