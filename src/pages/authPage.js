import "../styles/App.css";
import "../styles/AuthPage.css";
import { useState } from "react";

function AuthPage() {
  let title_options = ["Welcome Back!", "Get Started Now"];
  let subtitle_options = [
    "Enter your credentials to use your account",
    "Enter your credentials to create an account",
  ];
  let buttonTitle_options = ["Login", "Register"];

  const [title, setTitle] = useState("Welcome Back!");
  const [subtitle, setSubtitle] = useState(
    "Enter your credentials to use your account"
  );
  const [buttonTitle, setButtonTitle] = useState("Login");

  const [authState, setAuthState] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);

  const [formHeight, setFormHeight] = useState("40%");
  const [inputHeight, setInputHeight] = useState("0%");
  const [checkBoxHeight,setCheckBoxHeight] = useState("0%");

  const [errorMessages, setErrorMessages] = useState({});

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = () => {
    setFormHeight(authState === 0 ? "55%" : "40%");

    setAuthState((prevState) => (prevState === 0 ? 1 : 0));
    setReverse(true);
    setTimeout(() => {
      setInputHeight(authState === 0 ? "25%" : "0%");
      setCheckBoxHeight(authState === 0 ? "7.5%" : "0%");
    }, 100);
    setTimeout(() => {
      setReverse(false);
      setAnimate(true);
      setTitle(title_options[authState === 0 ? 1 : 0]);
      setSubtitle(subtitle_options[authState === 0 ? 1 : 0]);
      setButtonTitle(buttonTitle_options[authState === 0 ? 1 : 0]);
    }, 1200);

    setTimeout(() => setAnimate(false), 2500);
  };

  return (
    <div className="App">
      <div id="mainContent">
        <div id="logo">
          <img src={require("../assets/tasker_logo.png")} alt="Arrow" />
        </div>
        <div id="leftPage">
          <div id="authLayout">
            <div id="layoutHeader">
              <h3 className={animate ? "typed" : reverse ? "reverse" : null}>
                <span>{title}</span>
              </h3>
              <p className={animate ? "typed" : reverse ? "reverse" : null}>
                {" "}
                {subtitle}
              </p>
              <div id="headerButtons">
                <button className="loginButton">
                  <img src={require("../assets/google_logo.png")} alt="Arrow" />
                  <p>Log In With Google</p>
                </button>
                <button className="loginButton">
                  <img src={require("../assets/apple_logo.png")} alt="Arrow" />
                  <p>Log In With Apple</p>
                </button>
              </div>
            </div>
            <div id="layoutSpacer">
              <div className="spacerBar" />
              <p>or</p>
              <div className="spacerBar" />
            </div>
            <div className="formContainer" style={{ height: formHeight }}>
              <form>
                <div
                  className="formInput"
                  style={{
                    height: inputHeight,
                  }}
                >
                  <label>Username</label>
                  <input type="name" name="email" required />
                  {renderErrorMessage("email")}
                </div>

                <div className="formInput">
                  <label>Email</label>
                  <input type="email" name="email" required />
                  {renderErrorMessage("email")}
                </div>

                <div className="formInput">
                  <label>Password</label>
                  <input type="password" name="pass" required />
                  {renderErrorMessage("pass")}
                </div>
                <div
                  className="checkBox"
                  style={{
                    height: checkBoxHeight,
                  }}
                >
                  <input type="checkbox" />
                  <label >I agree to <p>Terms of Service</p></label>
                </div>
                <button onClick={() => handleSubmit()} disabled={animate}>
                  <p className={animate ? "typed" : reverse ? "reverse" : null}>
                    {buttonTitle}
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div id="rightPage">
          <div id="preview">
            <div id="previewTitle">
              <h3>The simplest way to manage your tasks</h3>
              <p>Enter your credentials to access your account</p>
            </div>
            <img src={require("../assets/preview_image.png")} alt="preview" />
          </div>
        </div>

        <footer>
          <p>&copy; 2023 Ortan Mihai. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default AuthPage;
