import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import iconCorrect from "../public/images/icon-correct.svg";
import iconIncorrect from "../public/images/icon-error.svg";
import Header from "../components/Header";

export default function Quiz({
  currentQuiz,
  setCurrentQuiz,
  quizzes,
  currentScore,
  setCurrentScore,
}) {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const letters = ["A", "B", "C", "D"];

  let { name } = useParams();
  const navigate = useNavigate();

  function getCurrentQuiz() {
    const selectedQuiz = quizzes.find((quiz) => quiz.title === name);
    setCurrentScore(0);
    if (!selectedQuiz) {
      navigate("/");
      return;
    }

    setCurrentQuiz(selectedQuiz);
  }

  function updateScore() {
    setCurrentScore((prev) => prev + 1);
    /*localStorage.setItem("score", currentScore);*/
  }

  function handleUserSubmit(option) {
    const isAnswerCorrect = option === currentQuestion.answer;
    isAnswerCorrect && updateScore();
    setIsSubmitted(true);
    /*setCurrentIndex((prev) => prev + 1);*/
  }

  function handleNextQuestionTransition() {
    const amountOfQuestions = currentQuiz.questions.length;
    if (amountOfQuestions === currentIndex + 1) {
      navigate("/score", {
        state: {
          currentScore: currentScore,
          amountOfQuestions: amountOfQuestions,
          currentQuiz: currentQuiz,
        },
      });
    }
    setCurrentIndex((prev) => prev + 1);
    setIsSubmitted(false);
    setCurrentAnswer(null);
  }

  useEffect(() => {
    const current = currentQuiz?.questions?.[currentIndex] ?? null;

    setCurrentQuestion(current);
  }, [currentQuiz, currentIndex]);

  useEffect(() => {
    getCurrentQuiz();
  }, []);

  return (
    <div className="quiz">
      <Header>
        <span
          className={`start-menu-button-icon-container ${currentQuiz.title}`}
        >
          <img src={currentQuiz.icon} alt={`icon of ${currentQuiz.title}`} />
        </span>
        <h1 className="quiz-title">{currentQuiz.title}</h1>
      </Header>

      <div className="quiz-container">
        <div className="quiz-question">
          <p className="total">
            Question {currentIndex + 1} of {currentQuiz?.questions?.length}
          </p>
          <p className="question">{currentQuestion?.question}</p>
        </div>
        <div className="quiz-answers">
          {currentQuestion?.options?.map((option, index) => (
            <button
              disabled={isSubmitted}
              key={index}
              onClick={() => {
                setCurrentAnswer(option);
                setIsSubmitted(false);
              }}
              className={`answer-button 
              ${currentAnswer == option ? "active" : ""} 
              ${isSubmitted && option === currentQuestion.answer && option === currentAnswer ? "correct-answer" : ""} 
              ${isSubmitted && currentAnswer === option && currentQuestion.answer !== currentAnswer ? "wrong-answer" : ""}
              `}
            >
              <span className="answer-button-start">
                <span
                  className={`${
                    option === currentAnswer &&
                    !isSubmitted &&
                    "selected-answer"
                  } ${
                    isSubmitted &&
                    option === currentAnswer &&
                    option !== currentQuestion.answer &&
                    "wrong-answer-bg"
                  } ${
                    isSubmitted &&
                    option === currentQuestion.answer &&
                    option === currentAnswer &&
                    "correct-answer-bg"
                  } answer-button-letter`}
                >
                  {letters[index]}
                </span>
                <span>{option}</span>
              </span>
              <span className="answer-button-end">
                {isSubmitted &&
                  currentAnswer === option &&
                  currentQuestion.answer !== currentAnswer && (
                    <img src={iconIncorrect} alt="icon incorrect answer" />
                  )}

                {isSubmitted &&
                  currentQuestion.answer !== currentAnswer &&
                  option === currentQuestion.answer && (
                    <img src={iconCorrect} alt="icon correct answer" />
                  )}

                {isSubmitted &&
                  option === currentQuestion.answer &&
                  option === currentAnswer && (
                    <img src={iconCorrect} alt="icon correct answer" />
                  )}
              </span>
            </button>
          ))}

          {!isSubmitted && (
            <button
              onClick={() => handleUserSubmit(currentAnswer)}
              className={`submit-button ${currentAnswer === null ? "disabled" : ""}`}
              disabled={currentAnswer === null}
            >
              Submit Answer
            </button>
          )}
          {isSubmitted && (
            <button
              onClick={() => {
                handleNextQuestionTransition();
              }}
              className="submit-button"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
