import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Score() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentScore, amountOfQuestions, currentQuiz } = state;

  function handleResetQuiz() {
    navigate("/");
  }

  return (
    <div className="score-menu">
      <Header>
        <span
          className={`start-menu-button-icon-container ${currentQuiz.title}`}
        >
          <img src={currentQuiz.icon} alt={`icon of ${currentQuiz.title}`} />
        </span>
        <h1 className="quiz-title">{currentQuiz.title}</h1>
      </Header>

      <div className="score-container">
        <div className="score-menu-info-title">
          <div className="score-menu-info-title-light">
            Quiz completed <br />
          </div>
          <div className="score-menu-info-title-medium">You scored...</div>
        </div>
        <div className="score-menu-wrapper">
          <div className="score-menu-container">
            <div className="score-menu-info-header">
              <span
                className={`start-menu-button-icon-container ${currentQuiz.title}`}
              >
                <img src={currentQuiz.icon} alt={currentQuiz.title} />
              </span>
              <span className="score-menu-info-header-title">
                {currentQuiz.title}
              </span>
            </div>
            <div className="score-wrapper">
              <p className="score">{currentScore}</p>
              <p className="score-info">out of {amountOfQuestions}</p>
            </div>
          </div>
          <Button onClick={handleResetQuiz} background="purple" size="lg">
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
}
