import "../styles/App.css";
import "../styles/Animations.css";
import NavBar from "../components/navbar";
import TopBar from "../components/topBar";
import MainContent from "../components/mainContent";

import { useEffect, useState } from "react";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
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
