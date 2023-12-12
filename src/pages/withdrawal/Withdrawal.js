import React from 'react';
import styles from './withdrawal.module.css';
const Withdrawal = () => {
    return (
        <div className={styles.findFormContainer}>
  <h2>회원탈퇴</h2>
          <div></div>
          <label htmlFor="email" className={styles.labelEmail}>본인확인</label>
          <div className={styles.inputWithButton}>
            <input type="email" id="email" className={styles.findInput} placeholder='비밀번호를 입력하세요'/>
            <button className={styles.findBtn}>탈퇴</button>
          </div>
          <div></div>
</div>
    );
};

export default Withdrawal;