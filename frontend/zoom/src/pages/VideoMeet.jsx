import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../styles/videomeet.css";
import { TextField, Button } from "@mui/material";

const server_url = "http://localhost:3000";

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com.19302" }],
};

export default function VideoMeetComponent() {
  var socketRef = useRef();
  var socketIdRef = useRef();
  let localVidoeRef = useRef();
  let [videoAvailable, setvideoAvailabel] = useState(true);
  let [audioAvailable, setaudioAvailabel] = useState(true);
  let [video, setvideo] = useState();
  let [audio, setaudio] = useState();
  let [screen, setscreen] = useState();
  let [showmodal, setshowmodal] = useState();
  let [screenAvailable, setscreenAvailable] = useState();
  let [messages, setmessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newmessages, setnewmessages] = useState(0);
  let [askforusername, setaskforusername] = useState(true);
  let [username, setusername] = useState("");
  var videoRef = useRef([]);
  let [videos, setvideos] = useState([]);

  const getpermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoPermission) {
        setvideoAvailabel(true);
      } else {
        setvideoAvailabel(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (audioPermission) {
        setaudioAvailabel(true);
      } else {
        setaudioAvailabel(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setscreenAvailable(true);
      } else {
        setscreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVidoeRef.current) {
            localVidoeRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getpermissions();
  }, []);

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(() => {})
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVidoeRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  let connectToSocketServer = () => {
    socketRef.current = io(server_url, { secure: false });
    // socketRef.current.on('signal',gotMessage)
  };

  let getMedia = () => {
    setvideo(videoAvailable);
    setaudio(audioAvailable);
    connectToSocketServer();
  };

  let connect = () => {
    setaskforusername(false);
    getMedia();
  };

  return (
    <div>
      {askforusername === true ? (
        <div>
          <h2>Enter into Lobby</h2>
          <TextField
            id="outlined-basic"
            label="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" onClick={connect}>
            Connect
          </Button>
          <div>
            {" "}
            <video ref={localVidoeRef} autoPlay muted></video>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
