import "./styles/App.css";
import "./styles/Animations.css";
import Dashboard from "./pages/dashboard";
import AuthPage from "./pages/authPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route  element={<AuthPage />} />
          <Route index path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
