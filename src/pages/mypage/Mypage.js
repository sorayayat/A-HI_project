import React from 'react';
import styles from './mypage.module.css';

const Mypage = () => {
    return (
        <>
        <div className={styles.container}>
            <h3>찜한 공고</h3>
        <div className={styles.myContainer}>
        <button >이전</button>
            <div><img src='/images/k1.jpg'></img></div>
            <div><img src='/images/k1.jpg'></img></div>
            <div><img src='/images/k1.jpg'></img></div>
            <div><img src='/images/k1.jpg'></img></div>
            <button >다음</button>
      </div>
    <h3>추천 공고</h3>
      <div className={styles.myContainer}>
      <button >이전</button>
      <div><img src='/images/k1.jpg'></img></div>
            <div><img src='/images/k1.jpg'></img></div>
            <div><img src='/images/k1.jpg'></img></div>
            <div><img src='/images/k1.jpg'></img></div>
            <button >다음</button>
      </div>




      </div>
      </>
    );
};

export default Mypage;