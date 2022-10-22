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
    })
  }

  return (
    <div className="add-member-modal">
      <div>
        <p>{channelName}</p>
        <label>Add</label>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
        />
      </div>

      <ul>
        {userList &&
          query !== "" &&
          userList.map((user) => {
            if (!user.email.startsWith(query)) return null;
            return (
              <li
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
