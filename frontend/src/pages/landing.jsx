import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <div className="nav">
        <div className="navHeader">
          <h2>Video Call</h2>
        </div>
        <div className="navList">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">Login</div>
        </div>
      </div>

      <div className="landingMainContainer">
        <div className="content">
          <h1>
            <span style={{ color: "#ff9839" }}>Connect</span> with your loved
            ones
          </h1>
          <p>Cover a distance by video calling</p>
          <div role="button" className="startbtn">
            <Link to={"/auth"}>Get started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt=""></img>
        </div>
      </div>
    </div>
  );
}
