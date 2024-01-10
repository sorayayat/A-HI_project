import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.loading}>
                {/* <div className={styles.loadingBarProgres}></div> */}
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default LoadingScreen;
