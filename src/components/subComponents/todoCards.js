
import { useState, useEffect } from "react";
import { todo } from "../../hooks/database";
function ToDoCards() {
  const [todoHeight, setToDoHeight] = useState("90%");
  const [todoPressed, setTodoPressed] = useState(true);
  const [todoOpacity, setTodoOpacity] = useState(0);
  
  let cardsColors = ["#d84721", "#fd9d28", "#78d734", "#78d734"];

  const calculateHeight = () => {
    let x = 13;
    for (let i = 0; i < todo.length; i++)
      if (todo[i].has_image === true) {
        x = x + 34;
      } else x = x + 13;
    setToDoHeight(x.toString() + "%");
    console.log(x);
  };

  useEffect(() => {
    setTimeout(() => calculateHeight(),150);
    setTimeout(() => setTodoOpacity(1), 150);
  }, []);

  function triggerToDo() {
    if (todoPressed && todoOpacity === 1) {
      setTodoPressed(false);
      setToDoHeight("0%");
      setTodoOpacity(0);
    } else {
      setTodoPressed(true);

      calculateHeight();
      setTimeout(() => setTodoOpacity(1), 300);
    }
  }
  return (
    <div className="categoryBody" style={{ height: todoHeight }}>
      <div className="categoryHeader">
        <h3>To Do</h3>
        <div className="categoryHeaderIcons">
          <button onClick={() => triggerToDo()}>
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
      {todo.map((todo, index) => (
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
              <img src={require("../../assets/description_icon.png")} alt="edit" />
            ) : null}
            {todo.has_comments ? (
              <div className="cardComments">
                <img src={require("../../assets/comments_icon.png")} alt="edit" />
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
      <button className="plusTask" style={{ opacity: todoOpacity }}>
        <img
          style={{ width: "7.5%", height: "auto", alignSelf: "center" }}
          src={require("../../assets/plus_icon.png")}
          alt="edit"
        />
        <h4>Add task</h4>
      </button>
    </div>
  );
}

export default ToDoCards;
