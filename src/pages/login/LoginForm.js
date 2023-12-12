import React from 'react';
import styles from './LoginForm.module.css';
import {  Link } from "react-router-dom";
const LoginForm = () => {
    return (
        <div className={styles.loginFormContainer}>
        <h2>로그인</h2>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.loginLabel}>이메일</label>
            <input type="email" id="email" className={styles.loginInput} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.loginLabel}>비밀번호</label>
            <input type="password" id="password" className={styles.loginInput} />
          </div>
          <button type="submit" className={styles.loginBtn}>로그인</button>
        <div className={styles.links}>
        <Link to="/findForm">ID/PW찾기</Link>
          <Link to="/joinForm">회원가입</Link>






        </div>
      </div>
    );
};

export default LoginForm;