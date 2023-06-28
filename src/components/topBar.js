import "../styles/App.css";
import "../styles/TopBar.css";
import { useEffect, useState } from "react";
function TopBar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div id="topBar">
      <h3>Team Tasks</h3>
      <div id="topRight">
        <input
          type="search"
          placeholder="Search here"
          onChange={""}
          value={""}
        />
        <img
          src={require("../assets/notification_icon.png")}
          alt="notification"
        />
        <img
          style={{ width: "3.5%", borderRadius: "50%" }}
          src={userInfo.image_url?null:require("../assets/user_icon.png")}
          alt="profile"
        />
      </div>
    </div>
  );
}

export default TopBar;
