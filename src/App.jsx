import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartMenu from "./pages/StartMenu";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";
import { quizzes } from "./data.json";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartMenu quizzes={quizzes} />} />
        <Route
          path="/:name"
          element={
            <Quiz
              quizzes={quizzes}
              currentScore={currentScore}
              setCurrentScore={setCurrentScore}
              currentQuiz={currentQuiz}
              setCurrentQuiz={setCurrentQuiz}
            />
          }
        />
        <Route
          path="/score"
          element={<Score />}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
