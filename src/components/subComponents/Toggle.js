
import { useState } from "react";

import "../../styles/Toggle.css";
export default function Toggle({ label, toggled, onClick, disabledCheck }) {
    const [isToggled, toggle] = useState(toggled);
  
    const callback = () => {
      toggle(!isToggled);
      onClick(!isToggled);
    };
  
    return (
      <label className="label">
        <input type="checkbox" disabled={disabledCheck} defaultChecked={isToggled} onClick={callback} className="input" />
        <span className="span"></span>
      </label>
    );
  }
  