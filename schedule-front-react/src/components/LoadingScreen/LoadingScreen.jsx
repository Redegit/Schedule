import { CircularProgress } from '@mui/material';
import './LoadingScreen.scss'

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <CircularProgress />
        </div>
    );
}

export default LoadingScreen;