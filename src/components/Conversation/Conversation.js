import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import saveContacts from "../Contacts/SaveContacts";
import "../Conversation/Conversation.css";

const Conversation = ({ receiverEmail, contacts, setContacts }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const { receiverClass, id: receiverId } = useParams();

  const sendMessage = async (e) => {
    e.preventDefault();
    setMessageBody('');
    const message = {
      receiver_id: receiverId,
      receiver_class: receiverClass,
      body: messageBody,
    };
    setChatMessages([...chatMessages, message]);

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
    })
      .then((response) => {
        return response.json();
      })

    if (receiverClass === 'User') {saveContacts(receiverEmail, receiverId);}  
    
    const checker = contacts.some((contact) => contact.email === receiverEmail);
    if (!checker && receiverClass === 'User') {
      setContacts([
        ...contacts,
        { email: receiverEmail, id: receiverId },
      ]);
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

    {
      /* if (localStorage.getItem(`directMessagesTo${receiverId}`)) {
            const dmsToReceiverId = JSON.parse(localStorage.getItem(`directMessagesTo${receiverId}`))
            setChatMessages(dmsToReceiverId);
        } */
    }
  }, [receiverId]);

  return (
    <>
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
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Conversation;
