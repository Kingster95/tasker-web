import "../styles/App.css";
import "../styles/TopBar.css";
import { useEffect, useState } from "react";
function TopBar() {
  const [message, setMessage] = useState("Loading....");

useEffect(() => {
  fetch("https://tasker-server.vercel.app/about")
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.message); // Access the 'message' property from the JSON response
    });
}, []);
  return (
    <div id="topBar">
      <h3>{message}</h3>
      <div id="topRight">
        <input
          type="search"
          placeholder="Search here"
          onChange={null}
          value={""}
        />
        <img
          src={require("../assets/notification_icon.png")}
          alt="notification"
        />
        <img
          style={{ width: "3.5%", borderRadius: "50%" }}
          src={require("../assets/profile_pic.jpg")}
          alt="profile"
        />
      </div>
    </div>
  );
}

export default TopBar;
