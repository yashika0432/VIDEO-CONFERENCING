import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import Authentication from "./pages/authentication";
import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoMeet from "./pages/videoMeet";
import HomeComponent from "./pages/home";
import History from "./pages/history";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/history" element={<History />} />
            <Route path="/:url" element={<VideoMeet />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
