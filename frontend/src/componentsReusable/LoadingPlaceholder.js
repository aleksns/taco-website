import "../App.css";
import loadingIcon from "../images/stopwatch.png";
import loadingIconRed from "../images/stopwatchRed.png";

export default function LoadingPlaceholder(props) {
  const { isSecondaryColor } = props;

  return (
    <div className="loading-placeholder">
      {isSecondaryColor ? (
        <>
          <img
            src={loadingIconRed}
            className="loading-placeholder-img red-style"
            alt="stopwatch-red"
          />
          <h1 className="red-style">...Loading</h1>
        </>
      ) : (
        <>
          <img
            src={loadingIcon}
            className="loading-placeholder-img"
            alt="stopwatch"
          />
          <h1>...Loading</h1>
        </>
      )}
    </div>
  );
}
