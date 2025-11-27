import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route
            path="/auth"
            element={<Authentication></Authentication>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
