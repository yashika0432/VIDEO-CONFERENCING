import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { Button } from "@mui/material";
import { AuthContext } from "../contexts/authContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    try {
      const message = await addToUserHistory(meetingCode);
      console.log("Response from backend:", message);
      navigate(`/${meetingCode}`);
    } catch (e) {
      console.error("Failed to add to history:", e);
      alert("Failed to join meeting. Please try again.");
    }
  };
  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Video Call</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            LogOut
          </Button>
        </div>
      </div>
      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality video call over long distances</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              ></TextField>{" "}
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join Call
              </Button>
            </div>
          </div>

          <div className="rightPanel">
            <img srcSet="/logo3.png" alt=""></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
