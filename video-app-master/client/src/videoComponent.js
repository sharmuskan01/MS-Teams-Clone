import React, { useCallback, useState } from "react";
import Lobby from "./lobbyComponent";
import Room from "./roomComponent";

const VideoChat = () => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const userNameChange = useCallback((event) => {
    setUserName(event.target.value);
  }, []);

  const roomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: userName,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [userName, roomName]
  );

  const logOut = useCallback(() => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = <Room roomName={roomName} token={token} logOut={logOut} />;
  } else {
    render = (
      <Lobby
        userName={userName}
        roomName={roomName}
        userNameChange={userNameChange}
        roomNameChange={roomNameChange}
        submit={submit}
      />
    );
  }

  return render;
};

export default VideoChat;
