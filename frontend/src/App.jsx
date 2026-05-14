import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeInput from "./components/ThemeInput.jsx";
import StoryLoader from "./components/StoryLoader.jsx";
import StoryGame from "./components/StoryGame.jsx";
import StoryGenerator from "./components/StoryGenerator.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Interactive Storyboard</h1>
        </header>
        <main>
          <Routes>
            <Route path={"/story/:id"} element={<StoryLoader />} />
            <Route path={"/"} element={<StoryGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
