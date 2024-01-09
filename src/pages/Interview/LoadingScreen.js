import interviewstyle from './Interview.module.css';

const LoadingScreen = ({ isLoading }) => {
    if (!isLoading) return null;
  
    return (
      <div className="loading loading-full-screen">
        <div className="loading-dim"></div>
        <div className="indicator">
          <div className="progress-rail">
            <div className="progress" style={{ width: '100%' }}></div> {/* 100% 로드를 가정 */}
            
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingScreen;