import "../styles/App.css";
import "../styles/Animations.css";
import NavBar from "../components/navbar";
import TopBar from "../components/topBar";
import MainContent from "../components/mainContent";
import * as userController from '../hooks/usersAPI';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const isGuest = JSON.parse(localStorage.getItem("isGuest"));
    if (userInfo)
    {
      userController
      .fetchUser(userInfo.email)
      .then((data) => {
        if (data.error === false) {
          if (data.userId) {
            localStorage.setItem("userInfo", JSON.stringify(data));
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    else if ( isGuest != true )
    {
      navigate("/");
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="App">
      <NavBar />
      <div id="rightBody">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
}

export default Dashboard;
