import "./styles/App.css";
import "./styles/Animations.css";
import NavBar from "./components/navbar";
import TopBar from "./components/topBar";
import MainContent from "./components/mainContent";

import { useEffect, useState } from "react";

function App() {

  
  
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

export default App;
