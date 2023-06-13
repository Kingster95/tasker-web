import logo from "./logo.svg";
import "./styles/App.css";
import "./styles/Animations.css";
import NavBar from "./components/navbar";
import TopBar from "./components/topBar";

import { todo } from "./hooks/database";
import { useEffect, useState } from "react";

function App() {

  
  const [todoHeight,setToDoHeight] = useState("0%");
  const [pressed,setPressed] = useState(true);
  const [cardsOpacity,setCardsOpacity] = useState(1);

  const calculateHeight = () =>{
      let x = 0;
      for ( let i = 0 ; i < todo.length ; i++ )
        if ( todo[i].has_image === true )
        {
            x = x + 30;
        }
        else
          x = x + 20;
      setToDoHeight(x.toString() + "%");
      console.log(x);
  }
  useEffect(() => {
    calculateHeight();
  }, []);
  
  function triggerToDo(){
    if( pressed && cardsOpacity === 1 )
    {
      setPressed(false);
      setToDoHeight("0%");
      setCardsOpacity(0);
    }
    else
    {
      setPressed(true);
      
      calculateHeight();
      setTimeout(()=>setCardsOpacity(1),700);
    }
  }
  return (
    <div className="App">
      <NavBar />
      <div id="rightBody">
        <TopBar />
        <div id="mainContent">
          <div className="categoryBody" style={{height:todoHeight}}>
            <div className="categoryHeader">
              <h3>To Do</h3>
              <div className="categoryHeaderIcons">
                <img src={require("./assets/plus_icon.png")} alt="plus" />
                <button style={{backgroundColor:"transparent", border:0, width:"30%", alignSelf:"center", borderRadius:"10px" }} onClick={()=>triggerToDo()}>
                <img style={{width:"80%", alignSelf:"center"}}src={require("./assets/arrow_down.png")} alt="edit" />
                </button>
              </div>
            </div>
            {
            todo.map((todo, index) => (
              <div key={index} className="categoryCard" style={{opacity:cardsOpacity}}>
                <div className="cardHeader">
                  <h4 className="h4">{todo.title}</h4>
                  <img src={require("./assets/edit_icon.png")} alt="edit" />
                </div>
                {todo.has_image ? (
                  <img
                    style={{
                      width: "90%",
                      height: "15vh",
                      alignSelf: "center",
                      objectFit: "cover",
                      marginTop: "2%",
                      marginBottom: "5%",
                      borderRadius: "16px",
                    }}
                    src={require("./assets/background_1.jpg")}
                    alt="edit"
                  />
                ) : null}
                <div className="cardInfo">
                  {todo.has_description ? (
                    <img
                      src={require("./assets/description_icon.png")}
                      alt="edit"
                    />
                  ) : null}
                  {todo.has_comments ? (
                      <div className="cardComments">
                      <img
                        src={require("./assets/comments_icon.png")}
                        alt="edit"
                      />
                      <p>{todo.comments_number}</p>
                      </div>
                      
                  ) : null}
                   {todo.has_files ? (
                      <div className="cardComments">
                      <img
                        src={require("./assets/file_icon.png")}
                        alt="edit"
                      />
                      <p>{todo.files_attached}</p>
                      </div>
                      
                  ) : null}
                  
                </div>
              </div>
            ))
            }
          </div>
          <div className="categoryBody" style={{height:{todoHeight}}}></div>
          <div className="categoryBody" style={{height:{todoHeight}}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
