import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Video from "twilio-video";
import Participant from "./participantComponent";

const Room = ({ roomName, token, logOut }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));
  console.log("remoteParticipants", remoteParticipants.length > 0);
  return (
    <div className="room">
      <h3>Remote Participants</h3>
      {remoteParticipants && remoteParticipants.length <= 0 && (
        <div className="spinnercontainer">
          <Spinner animation="border" size={100} />
        </div>
      )}
      <div className="remote-participants">{remoteParticipants}</div>
      <div className="buttoncontainer">
        <button onClick={logOut}>Log out</button>
      </div>

      <div className="roominfocontainer">
        <h2>Room: {roomName}</h2>
      </div>
    </div>
  );
};

export default Room;
