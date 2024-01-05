import React from "react";
import styles from "./Card.module.css";

const Card = () => {
  return (
    <>
      {/* 카드 위에 제목을 추가 */}
      <h1 className={styles.title}>자기소개서 냥냥냥냥</h1>
      <div className={styles.container}>
        <div className={styles.contentArea}>
          {/* 카드 내 하늘색 부분 영역 */}
          <p className={styles.text}>
            여기에 이력서 정보를 넣으세요~ 폰트 사이즈 웬만하면 바꾸지 마셈 큰
            글씨를 왜케 좋아함
          </p>
        </div>
        <div className={styles.content}>
          {/* 카드 내 흰색 부분 영역 */}
          <p className={styles.text}>여기에 자소서를 넣으시고</p>
        </div>
      </div>
    </>
  );
};

export default Card;
