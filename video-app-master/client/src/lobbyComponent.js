import React from "react";

const Lobby = ({
  userName,
  roomName,
  userNameChange,
  roomNameChange,
  submit,
}) => {
  return (
    <form onSubmit={submit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Nickname:</label>
        <input
          type="text"
          id="field"
          value={userName}
          onChange={userNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={roomNameChange}
          required
        />
      </div>
      <div className="buttoncontainer">
        <button type="submit">Enter</button>
      </div>
    </form>
  );
};

export default Lobby;
