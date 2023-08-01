import { useState, useEffect } from "react";
import { default_review } from "../../hooks/database";
import { Select, MenuItem, Input } from "@mui/material";
import * as cardsController from "../../hooks/projectsAPI";

function ReviewCards() {
  const [cards, setCards] = useState(default_review);
  const [todoHeight, setToDoHeight] = useState("90%");
  const [todoPressed, setTodoPressed] = useState(true);
  const [todoOpacity, setTodoOpacity] = useState(0);
  const [addPressed, setAddPressed] = useState(false);

  const [addPriority, setAddPriority] = useState(0);
  const [addTitle, setAddTitle] = useState("");
  let cardsColors = ["#d84721", "#fd9d28", "#78d734", "#78d734"];

  const handlePriority = (event) => {
    setAddPriority(event.target.value);
  };
  const handleTitle = (event) => {
    setAddTitle(event.target.value);
  };
  const calculateHeight = (x) => {
    x = x + 13;
    for (let i = 0; i < cards.length; i++)
      if (cards[i].has_image === true) {
        x = x + 34;
      } else x = x + 13;
    setToDoHeight(x.toString() + "%");
  };
  const handleAddTask = async () => {
    let newCard = {
      title: addTitle,
      has_image: false,
      has_description: false,
      has_comments: false,
      has_files: false,
      description: "",
      comments_number: 0,
      files_attached: 0,
      status: addPriority,
    };
    const isGuest = JSON.parse(localStorage.getItem("isGuest"));
    if (isGuest != true) {
      try {
        const projectsInfo = JSON.parse(localStorage.getItem("projects"));
        const selectedProject = JSON.parse(
          localStorage.getItem("selectedProject")
        );

        // Add the new card to the local state immediately
        setCards((prevCards) => [...prevCards, newCard]);
        console.log("PROJECT ID: " + projectsInfo[0]._id);
        // Use await or .then() to handle the response from addToDoCard
        if (selectedProject) {
          await cardsController.addReviewCard(
            newCard,
            projectsInfo[selectedProject]._id
          );
        } else {
          await cardsController.addReviewCard(newCard, projectsInfo[0]._id);
        }

        calculateHeight(15);
        setAddPressed(false);
      } catch (error) {
        console.error("Error adding todo card:", error.message);
        // Handle the error case here, e.g., show an error message to the user.
      }
    }
    else
    {
      setCards((prevCards) => [...prevCards, newCard]);
      calculateHeight(15);
      setAddPressed(false);
    }
  };
  useEffect(() => {
    const projectsInfo = JSON.parse(localStorage.getItem("projects"));
    const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));
    const isGuest = JSON.parse(localStorage.getItem("isGuest"));
    if (projectsInfo && isGuest != true) {
      if (selectedProject) {
        setCards(projectsInfo[selectedProject].review_cards);
        let x = 13;
        for (let i = 0; i < projectsInfo[0].review_cards.length; i++)
          if (projectsInfo[0].review_cards[i].has_image === true) {
            x = x + 34;
          } else x = x + 13;
        setToDoHeight(x.toString() + "%");
      } else if (projectsInfo.length >= 1) {
        setCards(projectsInfo[0].review_cards);
        let x = 16;
        for (let i = 0; i < projectsInfo[0].review_cards.length; i++)
          if (projectsInfo[0].review_cards[i].has_image === true) {
            x = x + 34;
          } else x = x + 16;
        setToDoHeight(x.toString() + "%");
        setTimeout(() => setTodoOpacity(1), 150);
      } else {
        setCards([]);
        setTimeout(() => setToDoHeight("15%"), 150);
        setTimeout(() => setTodoOpacity(1), 150);
      }
    } else {
      setTimeout(() => calculateHeight(0), 150);
      setTimeout(() => setTodoOpacity(1), 150);
    }
  }, []);

  function triggerToDo() {
    setAddPressed(false);
    if (todoPressed && todoOpacity === 1) {
      setTodoPressed(false);
      setToDoHeight("0%");
      setTodoOpacity(0);
    } else {
      setTodoPressed(true);

      calculateHeight(0);
      setTimeout(() => setTodoOpacity(1), 300);
    }
  }
  function triggerAddTask() {
    if ( addPressed === true )
    {
      setAddPressed(false);
      calculateHeight(0);
    }
    else{
      setAddPressed(true);
      calculateHeight(10);
    }
    
  }
  return (
    <div className="categoryBody" style={{ height: todoHeight }}>
      <div className="categoryHeader">
        <h3>In Review</h3>
        <div className="categoryHeaderIcons">
          <button onClick={() => triggerAddTask()}>
            <img
              style={{ width: "50%", height: "50%", alignSelf: "center" }}
              src={require("../../assets/plus_icon.png")}
              alt="edit"
            />
          </button>
          <button onClick={() => triggerToDo()}>
            <img
              className={`rotate-${todoPressed ? "down" : "up"}`}
              style={{ width: "50%", height: "50%", alignSelf: "center" }}
              src={require("../../assets/arrow_down.png")}
              alt="edit"
            />
          </button>
        </div>
      </div>
      {cards.map((todo, index) => (
        <div
          key={index}
          className="categoryCard"
          style={{ opacity: todoOpacity }}
        >
          <div className="cardHeader">
            <h4 className="h4">{todo.title}</h4>
            <img src={require("../../assets/edit_icon.png")} alt="edit" />
          </div>
          {todo.has_image ? (
            <img
              style={{
                width: "90%",
                height: "15vh",
                alignSelf: "center",
                objectFit: "cover",
                marginTop: "2%",
                marginBottom: "3%",
                borderRadius: "16px",
              }}
              src={require("../../assets/background_1.jpg")}
              alt="edit"
            />
          ) : null}
          <div className="cardInfo">
            {todo.has_description ? (
              <img
                src={require("../../assets/description_icon.png")}
                alt="edit"
              />
            ) : null}
            {todo.has_comments ? (
              <div className="cardComments">
                <img
                  src={require("../../assets/comments_icon.png")}
                  alt="edit"
                />
                <p>{todo.comments_number}</p>
              </div>
            ) : null}
            {todo.has_files ? (
              <div className="cardComments">
                <img src={require("../../assets/file_icon.png")} alt="edit" />
                <p>{todo.files_attached}</p>
              </div>
            ) : null}
            <div className="cardStatus">
              <div
                className="cardColor"
                style={{ backgroundColor: cardsColors[todo.status] }}
              />
            </div>
          </div>
        </div>
      ))}
      {addPressed === false ? (
        <button
          className="plusTask"
          style={{ opacity: todoOpacity }}
          onClick={() => triggerAddTask()}
        >
          <img
            style={{ width: "7.5%", height: "auto", alignSelf: "center" }}
            src={require("../../assets/plus_icon.png")}
            alt="edit"
          />
          <h4>Add task</h4>
        </button>
      ) : (
        <div className="addCardHolder" style={{ opacity: todoOpacity }}>
          <div className="addCardContainer" style={{ opacity: todoOpacity }}>
            <Input
              placeholder="Title"
              value={addTitle}
              onChange={handleTitle}
            />
            <Select
              labelId="addDropdown"
              value={addPriority}
              className="dropdown"
              onChange={handlePriority}
            >
              <MenuItem value={0}>High Priority</MenuItem>
              <MenuItem value={1}>Medium Priority</MenuItem>
              <MenuItem value={2}>Low Priority</MenuItem>
              <MenuItem value={3}>Standby</MenuItem>
            </Select>
          </div>
          <div className="decisionContainer">
            <button
              onClick={handleAddTask}
              className="fill"
              style={{ width: "25%", height: "75%", marginLeft: "4%" }}
            >
              <p>Add task</p>
            </button>
            <button className="cancelButton" onClick={() => triggerAddTask()} >
              <img
                style={{ width: "50%", height: "auto", alignSelf: "center" }}
                src={require("../../assets/x_icon.png")}
                alt="exit"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewCards;
