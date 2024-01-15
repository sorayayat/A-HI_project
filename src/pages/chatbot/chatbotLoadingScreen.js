import React from 'react';
import styles from './chatbotLoadingScreen.module.css';

const chatbotLoadingScreen = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
            <div className={styles.loading}>
                {/* <div className={styles.loadingBarProgres}></div> */}
                <span></span>
                <span></span>
                <span></span>
            </div>
    );
};

export default chatbotLoadingScreen;