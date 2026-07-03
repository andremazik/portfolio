import { Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

export default function StartMenu({ quizzes }) {
  return (
    <div className="start-menu">
      <Header />
      <div className="start-menu-container">
        <div className="start-menu-info">
          <h1 className="start-menu-info-title">
            <span className="start-menu-info-title-light">
              Welcome to the
              <br />
            </span>
            <span className="start-menu-info-title-medium">Frontend Quiz!</span>
          </h1>
          <p className="start-menu-info-text">Pick a subject to get started.</p>
        </div>

        <div className="start-menu-buttons">
          {quizzes.map((quiz, index) => (
            <Link to={`${quiz.title}`}>
              <Button key={index} size="sm">
                <span
                  className={`start-menu-button-icon-container ${quiz.title}`}
                >
                  <img
                    className="start-menu-button-icon"
                    src={quiz.icon}
                    alt={`icon of ${quiz.title}`}
                  />
                </span>
                <span className="start-menu-button-title">{quiz.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
