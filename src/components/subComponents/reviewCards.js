import { useState, useEffect } from "react";
import { review } from "../../hooks/database";

function ReviewCards() {
  const [reviewHeight, setReviewHeight] = useState("0%");
  const [reviewPressed, setReviewPressed] = useState(true);
  const [reviewOpacity, setReviewOpacity] = useState(1);

  let cardsColors = ["#d84721", "#fd9d28", "#78d734", "#78d734"];

  const calculateHeight = () => {
    let x = 13;
    for (let i = 0; i < review.length; i++)
      if (review[i].has_image === true) {
        x = x + 34;
      } else x = x + 13;
    setReviewHeight(x.toString() + "%");
    console.log(x);
  };

  useEffect(() => {
    calculateHeight();
  }, []);

  function triggerReview() {
    if (reviewPressed && reviewOpacity === 1) {
      setReviewPressed(false);
      setReviewHeight("0%");
      setReviewOpacity(0);
    } else {
      setReviewPressed(true);
      calculateHeight();
      setTimeout(() => setReviewOpacity(1), 300);
    }
  }

  return (
    <div className="categoryBody" style={{ height: reviewHeight }}>
      <div className="categoryHeader">
        <h3>In Review</h3>
        <div className="categoryHeaderIcons">
          <button onClick={() => triggerReview()}>
            <img
              style={{ width: "50%", height: "50%", alignSelf: "center" }}
              src={require("../../assets/plus_icon.png")}
              alt="edit"
            />
          </button>
          <button onClick={() => triggerReview()}>
            <img
              className={`rotate-${reviewPressed ? "down" : "up"}`}
              style={{ width: "50%", height: "50%", alignSelf: "center" }}
              src={require("../../assets/arrow_down.png")}
              alt="edit"
            />
          </button>
        </div>
      </div>
      {review.map((item, index) => (
        <div
          key={index}
          className="categoryCard"
          style={{ opacity: reviewOpacity }}
        >
          <div className="cardHeader">
            <h4 className="h4">{item.title}</h4>
            <img src={require("../../assets/edit_icon.png")} alt="edit" />
          </div>
          {item.has_image ? (
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
              src={require("../../assets/background_1.jpg")}
              alt="edit"
            />
          ) : null}
          <div className="cardInfo">
            {item.has_description ? (
              <img src={require("../../assets/description_icon.png")} alt="edit" />
            ) : null}
            {item.has_comments ? (
              <div className="cardComments">
                <img src={require("../../assets/comments_icon.png")} alt="edit" />
                <p>{item.comments_number}</p>
              </div>
            ) : null}
            {item.has_files ? (
              <div className="cardComments">
                <img src={require("../../assets/file_icon.png")} alt="edit" />
                <p>{item.files_attached}</p>
              </div>
            ) : null}
            <div className="cardStatus">
              <div
                className="cardColor"
                style={{ backgroundColor: cardsColors[item.status] }}
              />
            </div>
          </div>
        </div>
      ))}
      <button className="plusTask" style={{ opacity: reviewOpacity }}>
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

export default ReviewCards;
