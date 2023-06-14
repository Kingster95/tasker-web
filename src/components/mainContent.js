import "../styles/App.css";
import "../styles/TopBar.css";
import "../styles/MainContent.css";
import ToDoCards from "./subComponents/todoCards";
import ProgressCards from "./subComponents/progressCards";
import ReviewCards from "./subComponents/reviewCards";
function MainContent() {

  return (
    <div id="mainContent">
      <ToDoCards />
      <ProgressCards />
      <ReviewCards />
    </div>
  );
}

export default MainContent;
