import sunIcon from "../public/images/icon-sun-dark.svg";
import moonIcon from "../public/images/icon-moon-dark.svg";

export default function Header({ children }) {
  return (
    <div className="menu-header">
      <div className="logo-container">{children}</div>
      <div className="theme-container">
        <img src={sunIcon} alt="sun icon" />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <img src={moonIcon} alt="moon icon" />
      </div>
    </div>
  );
}
