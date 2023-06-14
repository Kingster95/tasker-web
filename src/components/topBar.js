import "../styles/App.css";
import "../styles/TopBar.css";
function TopBar() {
  return (
    <div id="topBar">
      <h3>Team Tasks</h3>
      <div id="topRight">
        <input
          type="search"
          placeholder="Search here"
          onChange={null}
          value={null}
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
