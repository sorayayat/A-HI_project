import React from 'react';
import styles from './memberUpdateForm.module.css';
const MemberUpdate = () => {
    return (
        <div className={styles.container}>
        <div className={styles.formContainer}>
              <h2>정보수정</h2>
              <div className={styles.inputContainer}>
            <label htmlFor="email">이메일</label>
            <div className={styles.inputOnly}>
              <input type="text" id="email" readOnly/>
            </div>
            <span></span>
          </div>
  
          {/* <div className={styles.inputContainer}>
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
   */}
          <div className={styles.inputContainer}>
            <label htmlFor="name">이름</label>
            <div className={styles.inputOnly}>
              <input type="text" id="name" />
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
  
          <div className={styles.inputContainer}>
              <button className={styles.joinBtn}>정보수정</button>
            <span></span>
          </div>
        </div>
      </div>
    );
};

export default MemberUpdate;