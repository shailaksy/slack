import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faPencil, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import LoginFunction from "../LoginFunction/LoginFunction";
import "../Sidebar/Sidebar.css";
import saveContacts from "../Contacts/SaveContacts";

function Sidebar({ contacts }) {
  let navigate = useNavigate();

  const editIcon = <FontAwesomeIcon icon={faPencil} />;
  const deletetIcon = <FontAwesomeIcon icon={faTrash} />;
  const updateIcon = <FontAwesomeIcon icon={faCheck} />;
  const [channelName, setChannelName] = useState("");
  const [channelList, setChannelList] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [editChannelName, setEditChannelName] = useState("");
  const [receivers, setReceivers] = useState([]);
  const [channelUsers, setChannelUsers] = useState([]);

  const fetchChannels = () => {
    fetch("http://206.189.91.54/api/v1/channels", {
      method: "GET",
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.data) {
          setChannelList(result.data);
        } else {
          setChannelList([]);
        }
      });
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();
    const channelObj = {
      id: new Date().getTime(),
      name: channelName,
      user_ids: [],
    };
    if (channelObj.name) {
      setChannelList([...channelList, channelObj]);
    }

    fetch("http://206.189.91.54/api/v1/channels", {
      method: "POST",
      body: JSON.stringify(channelObj),
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
  };

  const handleEdit = (id, editedChannelName) => {
    setIsEditing(id);
    setEditChannelName(editedChannelName);
  };

  const handleUpdate = (id) => {
    const updatedChannelList = channelList.map((channel) => {
      if (channel.id === id) {
        return {
          ...channel,
          channelName: editChannelName,
        };
      }
      return channel;
    });
    setChannelList(updatedChannelList);
    setIsEditing(-1);
  };

  const handleDeleteChannel = (id) => {
    setChannelList(
      channelList.filter((channel) => {
        return channel.id !== id;
      })
    );
  };

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fake = [{ email: "A" }, { email: "B" }];

  return (
    <div className="sidebar">
      <div className="channels-container">
        <h3>Channels</h3>
        <div className="channel-container">
          <ul>
            {channelList.map((channel) => {
              return (
                <li className="indiv-channel" key={channel.id}>
                  <span>
                    {isEditing === channel.id ? (
                      <input
                        className="editing-input"
                        type="text"
                        maxLength="20"
                        value={editChannelName}
                        onChange={(e) => {
                          setEditChannelName(e.target.value);
                        }}
                        onBlur={() => {
                          handleUpdate(channel.id);
                        }}
                      />
                    ) : (
                      <Link
                        to={`/dashboard/Channel/${channel.id}`}
                        className="channel-name-link"
                        //onChange={}
                      >
                        {channel.name}
                      </Link>
                    )}
                  </span>
                  {isEditing === channel.id ? (
                    <span className="update-delete-icon-view">
                      <button
                        className="edit-channel-buttons"
                        onClick={() => {
                          handleUpdate(channel.id);
                        }}
                      >
                        {updateIcon}
                      </button>
                      <button
                        className="edit-channel-buttons"
                        onClick={() => {
                          handleDeleteChannel(channel.id);
                        }}
                      >
                        {deletetIcon}
                      </button>
                      <button>Add</button>
                    </span>
                  ) : (
                    <span className="edit-icon-view">
                      <button
                        className="edit-channel-buttons"
                        onClick={() => {
                          handleEdit(channel.id, channel.name);
                        }}
                      >
                        {editIcon}
                      </button>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="create-channel">
          <form onSubmit={handleAddChannel}>
            <input
              type="text"
              className="create-channel-input"
              placeholder="Channel Name"
              maxLength="20"
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
            />

            {/*<select multiple 
                className='select-channel-users'
                onChange={(e) => {setChannelUsers(e.target.value)}}>
                
                {receivers.map((receiver) => {
                    return(
                        <option key={receiver.id} value={receiver.id}>{receiver.email}</option>
                    )
                })}
            </select> */}

            <button className="edit-channel-buttons">{updateIcon}</button>
          </form>
        </div>

        <div className="messages-container">
          <h3>Direct Messages</h3>
          <div className="message-container">
            <ul>
              {contacts.map((contact) => {
                return <li key={contact.id}>{contact.email}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>




    </div>
  );
}

export default Sidebar;
