import "../styles/App.css";
import "../styles/NavBar.css";
import { projects } from "../hooks/database";
import { useEffect, useState } from "react";

function NavBar() {
  const [showProjects, setShowProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState(0);
  const [projectsHeight, setProjectsHeight] = useState(
    (( projects.length + 0.75 ) * 6.5).toString() + "%"
  );

  const toggleProjects = () => {
    if (showProjects === true) {
      setProjectsHeight("5%");
      setShowProjects(false);
    } else {
      let x = ( projects.length + 0.75 ) * 6.5;
      let x_string = x.toString() + "%";
      setProjectsHeight(x_string);
      setShowProjects(true);
    }
  };

  return (
    <div id="leftNav">
      <div id="navHeader">
        <h1>TASKER</h1>
      </div>
      <div
        id="projectsDropdown"
        style={{
          height: projectsHeight,
          transition: "height 0.75s ease-in-out",
        }}
      >
        <button onClick={toggleProjects}>
          <h3>Projects</h3>
          <img
            className={`rotate-${showProjects ? "down" : "up"}`}
            src={require("../assets/arrow_down.png")}
            alt="Arrow"
          />
        </button>
        <div
          id="projectsList"
          style={{
            height:"100%",
            transition: "height 1s ease-in-out",
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="projectContainer">
              <div className="projectBubble" />
              <h4 className="h4">{project.title}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="createProject"></div>
      <div className="divider" />
      <div id="labelsContainer">
        <h3>Labels</h3>
        <div className="labelItem">
          <img src={require("../assets/red.png")} alt="red" />
          <p>High Priority</p>
        </div>
        <div className="labelItem">
          <img src={require("../assets/orange.png")} alt="orange" />
          <p>Medium Priority</p>
        </div>
        <div className="labelItem">
          <img src={require("../assets/green.png")} alt="green" />
          <p>Low Priority</p>
        </div>
        <div className="labelItem">
          <img src={require("../assets/green.png")} alt="green" />
          <p>Standby</p>
        </div>
      </div>
      <div id="bottomOptions">
        <button className="optionItem">
          <img src={require("../assets/help_icon.png")} alt="help" />
          <p>Help Center</p>
        </button>
        <button className="optionItem">
          <img src={require("../assets/logout_icon.png")} alt="help" />
          <p>Log Out</p>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
