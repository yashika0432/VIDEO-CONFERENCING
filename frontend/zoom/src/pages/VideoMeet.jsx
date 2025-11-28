import React, { useRef, useState } from "react";
import "../styles/videomeet.css";

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

  return (
    <div>
      {askforusername === true ? (
        <div>
          <h2>Enter into Lobby</h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
