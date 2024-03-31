import { CircularProgress } from "@mui/material";
import "./LoadingScreen.scss";

const LoadingScreen = ({ status }) => {
  if (status === "loading") {
    return (
      <div className={`loading-screen border`}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className={`loading-screen error border`}>
        <Error />
        {"Ошибка"}
      </div>
    );
  }
};

export default LoadingScreen;

const Error = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 16H12.01M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
