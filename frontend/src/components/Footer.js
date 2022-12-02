import "../App.css";
import gitImg from "../images/github-icon.png";
import { GIT_LINK } from "../services/services";

export default function Footer() {
  return (
    <div className="footer">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={GIT_LINK}
      >
        <img src={gitImg} alt="git-logo" />
        aleksns
      </a>
    </div>
  );
}
