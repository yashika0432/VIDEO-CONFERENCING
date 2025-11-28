import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/VideoMeet";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage></LandingPage>}></Route>
            <Route
              path="/auth"
              element={<Authentication></Authentication>}
            ></Route>
            <Route
              path=":/url"
              element={<VideoMeetComponent></VideoMeetComponent>}
            ></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
