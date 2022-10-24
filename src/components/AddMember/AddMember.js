import { useState } from "react";
import "../AddMember/AddMember.css";

const AddMember = ({ channelId, channelName, userList }) => {
  const [query, setQuery] = useState("");

  function handleSelectedReceiver(id) {
    const addedMember = {
      id: channelId,
      member_id: id,
    };
    fetch("http://206.189.91.54/api/v1/channel/add_member", {
      method: "POST",
      body: JSON.stringify(addedMember),
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        expiry: localStorage.getItem("expiry"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="add-member-modal">
      <div className="add-member-container">
        <h2 className="modal-channel">{channelName}</h2>
        <hr className="modal-hr" />
        <div className="modal-search">
          <label className="modal-label">Add a member</label>
          <input
            className="modal-search-input"
            type="text"
            placeholder="Search by email"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
        </div>
      </div>

      <ul className="modal-search-results">
        {userList &&
          query !== "" &&
          userList.map((user) => {
            if (!user.email.startsWith(query)) return null;
            return (
              <li
                className="modal-search-result"
                onClick={() => {
                  handleSelectedReceiver(user.id);
                  setQuery("");
                }}
              >
                {user.email}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AddMember;
