import React from 'react';
import styles from '../css/JoinForm.module.css';

const JoinForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
            <h2>회원가입</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.labelEmail}>이메일</label>
          <div className={styles.inputWithButton}>
          <div className={styles.inputOnly}>
            <input type="email" id="email" />
            </div>
            <button className={styles.joinBtn}>중복확인</button>
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.inputOnly}>
            <input type="password" id="password" />
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <div className={styles.inputOnly}>
            <input type="password" id="passwordConfirm" />
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="name">이름</label>
          <div className={styles.inputOnly}>
            <input type="text" id="name" />
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="age">나이</label>
          <div className={styles.inputOnly}>
            <input type="number" id="age" min={1} max={110} />
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="phoneNumber">전화번호</label>
          <div className={styles.inputOnly}>
            <input type="number" id="phoneNumber" minLength={10} maxLength={11} />
          </div>
          <span></span>
        </div>

        {/* <div className={styles.inputContainer}>
          <label htmlFor="address">주소</label>
          <div className={styles.inputOnly}>
            <input type="text" id="address" />
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="score">점수</label>
          <div className={styles.inputOnly}>
            <input type="text" id="score" />
          </div>
          <span></span>
        </div> */}

{/* 
        <div className={styles.radioContainer}>
          <label>성별</label>
          <div className={styles.radioButtons}>
            <div>
              남성
              <input type="radio" name="gender" value="male" />
            </div>
            <div>
              여성
              <input type="radio" name="gender" value="female" />
            </div>
          </div>
        </div>

        <div className={styles.radioContainer}>
          <label>구직여부</label>
          <div className={styles.radioButtons}>
            <div>
              구직중
              <input type="radio" name="jobStatus" value="yes" />
            </div>
            <div>
              휴식중
              <input type="radio" name="jobStatus" value="no" />
            </div>
          </div>
        </div> */}
        <div className={styles.inputContainer}>
            <button className={styles.joinBtn}>회원가입</button>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
