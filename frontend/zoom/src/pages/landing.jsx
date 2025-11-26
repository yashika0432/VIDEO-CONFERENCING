import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="LandingPageContainer">
      <div className="nav">
        <div className="navHeader">
          <h2>Video Call</h2>
        </div>
        <div className="navList">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </div>

      <div className="landingmainContainer">
        <div className="maincontent">
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            ones
          </h1>
          <p>Cover a distance by video call</p>
          <div role="button" className="mainbtn">
            <Link
              to={"/home"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mainimage">
          <img src="mobile.png"></img>
        </div>
      </div>
    </div>
  );
}
