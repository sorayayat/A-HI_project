import React from 'react';
import styles from './FindForm.module.css';
import {  Link } from "react-router-dom";
const FindForm = () => {
    return (
       /* JSX */
<div className={styles.findFormContainer}>
  <h2>ID/PW 찾기</h2>
  <label htmlFor="email" className={styles.labelEmail}>이메일 찾기</label>
  <div className={styles.inputWithButton}>
          <input type="email" id="email" className={styles.findInput} placeholder='전화번호를  - 빼고 입력하세요'/>
            <button className={styles.findBtn}>E-MAIL찾기</button>
          </div>
          <div></div>
          <label htmlFor="email" className={styles.labelEmail}>비밀번호 찾기</label>
          <div className={styles.inputWithButton}>
            <input type="email" id="email" className={styles.findInput} placeholder='이메일을 입력하세요'/>
            <button className={styles.findBtn}>PW찾기</button>
          </div>
          <div></div>
          <div className={styles.links}>
          <Link to="/loginForm">로그인</Link>
        </div>
</div>

    );
};

export default FindForm;