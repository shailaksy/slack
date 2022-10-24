import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import saveContacts from "../Contacts/SaveContacts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../Conversation/Conversation.css";

const Conversation = ({ receiverEmail, contacts, setContacts }) => {
  const navigate = useNavigate();
  const messageIcon = <FontAwesomeIcon icon={faEdit} />;
  const sendIcon = <FontAwesomeIcon icon={faPaperPlane} />;
  const [chatMessages, setChatMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const { receiverClass, id: receiverId } = useParams();

  const sendMessage = async (e) => {
    e.preventDefault();
    setMessageBody("");
    const message = {
      receiver_id: receiverId,
      receiver_class: receiverClass,
      body: messageBody,
    };
    if (!message.body) {
      setChatMessages([...chatMessages, message]);
    }
    await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });

    if (receiverClass === "User") {
      saveContacts(receiverEmail);
    }

    const checker = contacts.some((contact) => contact.email === receiverEmail);
    if (!checker && receiverClass === "User") {
      setContacts([...contacts, { email: receiverEmail, id: receiverId }]);
    }
  };

  useEffect(() => {
    fetch(
      `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`,
      {
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          expiry: localStorage.getItem("expiry"),
          uid: localStorage.getItem("uid"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setChatMessages(result.data);
      });
  }, [receiverId]);

  const newMessage = () => {
    navigate("/dashboard/");
    // setReceiverEmail('');
  };

  return (
    <>
      <div>
        <button onClick={newMessage} className="new-message-icon">
          {messageIcon}
        </button>
      </div>
      <div className="channel-chat">
        <ul className="message-ul">
          {chatMessages &&
            chatMessages.map((message, index) => {
              return (
                <li key={index} className="message-li">
                  {message.body}
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <form>
          <textarea
            value={messageBody}
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            placeholder={`Message ${receiverEmail}`}
            rows="5"
            cols="30"
            className="message-text-area"
          ></textarea>
          <button
            className="send-message-button"
            type="submit"
            onClick={sendMessage}
          >
            {sendIcon}
          </button>
        </form>
      </div>
    </>
  );
};

export default Conversation;
