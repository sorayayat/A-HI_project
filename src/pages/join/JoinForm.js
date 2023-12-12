import React from 'react';
import styles from './JoinForm.module.css';
import { useState } from "react";
import axios from 'axios';
const JoinForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name:"",
    phoneNumber:"",
  });
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }
    if(formData.password!==formData.confirmPassword) {
      alert('비밀번호와 비밀번호확인은 같은 값이어야 합니다.');
      return;
    }else if (formData.phoneNumber.length < 10) {
      alert("전화번호는 최소 10자리 이상 이어야 합니다.");
      return;
    } else if (formData.password.length <10 || formData.confirmPassword.length <10){
      alert("비밀번호와 비밀번호 확인은 11자리 이상 이어야 합니다.");
      return;
    }

  };
  const handleEmailCheck = () => {
    axios.get(`http://localhost:8001/api/email_duplication_check?email=${formData.email}`)
        .then(response => {
          // 응답 처리
          console.log(response.data);
        })
        .catch(error => {
          // 오류 처리
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          // 항상 실행되는 로직 (옵션)
        });

    setIsEmailChecked(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
            <h2>회원가입</h2>

        <div className={styles.inputContainer}>
          <label htmlFor="email" >이메일</label>
          <div className={styles.inputWithButton}>
          <div className={styles.inputOnly}>
            <input type="email" id="email" name="email" value={formData.email} required onChange={handleChange}/>
            </div>
            <button className={styles.joinBtn} onClick={handleEmailCheck} type='button'>중복확인</button>
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.inputOnly}>
            <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} placeholder='비밀번호는 11자리 이상 이어야 합니다.'/>
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <div className={styles.inputOnly}>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} required onChange={handleChange} placeholder='비밀번호와 같은 값을 입력해주세요.'/>
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="name">이름</label>
          <div className={styles.inputOnly}>
            <input type="text" id="name" name="name" value={formData.name} required onChange={handleChange}/>
          </div>
          <span></span>
        </div>

        {/* <div className={styles.inputContainer}>
          <label htmlFor="age">나이</label>
          <div className={styles.inputOnly}>
            <input type="number" id="age" min={1} max={110} />
          </div>
          <span></span>
        </div> */}

        <div className={styles.inputContainer}>
          <label htmlFor="phoneNumber">전화번호</label>
          <div className={styles.inputOnly}>
            <input type="number" id="phoneNumber"  name='phoneNumber' value={formData.phoneNumber} required onChange={handleChange} placeholder='전화번호는 10자리이상이어야 합니다.'/>
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
            <button className={styles.joinBtn} type="submit">회원가입</button>
          <span></span>
        </div>
      </div>
      </form>
    </div>
  );
};

export default JoinForm;
