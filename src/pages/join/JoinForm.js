import React from 'react';
import styles from './JoinForm.module.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const JoinForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name:"",
    phoneNumber:"",
  });
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }else if(!isPhoneChecked){
      alert('전화번호 중복 확인을 해주세요.');
      return;
    }

    if(formData.password!==formData.confirmPassword) {
      alert('비밀번호와 비밀번호확인은 같은 값이어야 합니다.');
      return;
    }else  if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 12) {
      alert("전화번호는 최소 10자리 이상 11자리 이하여야 합니다.");
      return;
    } else if (formData.password.length < 10 || formData.password.length > 25 ||
      formData.confirmPassword.length < 10 || formData.confirmPassword.length > 25){
      alert("비밀번호와 비밀번호 확인은 10자리 이상 25자리 이하 여야 합니다.");
      return;
    }
    alert("회원가입을 환영합니다. 가입하신 이메일로 인증메일을 보냈으니 확인해주시기 바랍니다. 잠시 기다려주시면 감사하겠습니다");
    axios.post(`./api/signup`,formData)
        .then(response => {
          navigate('/loginForm');
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
        });






  };
  const handleEmailCheck = () => {
    const emailInput = document.getElementById('email');

    if (emailInput.validity.valid) {
      axios.get(`/api/email_duplication_check?email=${formData.email}`)
          .then(response => {
            let result = (response.data)? "가입가능합니다":"기 등록된 이메일 입니다.";
            alert(result);
            setIsEmailChecked(result);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          })
          .finally(() => {
          });
    }else{
      alert('유효하지 않은 이메일 형식입니다.');
    }

  };
  const handlePhoneCheck = () => {
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 12) {
      alert("전화번호는 최소 10자리 이상 11자리 이하여야 합니다.");
      return;
    }
    if (phoneNumber.length>=10) {
      axios.get(`/api/phoneNumber_duplication_check?phoneNumber=${formData.phoneNumber}`)
          .then(response => {
            let result = (response.data)? "가입가능합니다":"이미 등록된 번호입니다.";
            alert(result);
            setIsPhoneChecked(result);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          })
          .finally(() => {
          });
    }else{
      alert('전화번호는 10자리 이상 입력해주세요.');
    }


  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setIsEmailChecked(false);
      setFormData({ ...formData, [name]: value });
    } else if (name === 'phoneNumber'){
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setIsPhoneChecked(false);
      setFormData({ ...formData, [name]: sanitizedValue });
    } else{
      setFormData({ ...formData, [name]: value });
    }
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
          <label htmlFor="phoneNumber" >전화번호</label>
          <div className={styles.inputWithButton}>
          <div className={styles.inputOnly}>
          <input type="text" id="phoneNumber"  maxLength={11} minLength={10} name='phoneNumber' value={formData.phoneNumber} required onChange={handleChange} placeholder='-를 빼고 입력해주세요.'/>
            </div>
            <button className={styles.joinBtn}  type='button' onClick={handlePhoneCheck}>중복확인</button>
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
          <label htmlFor="phoneNumber">전화번호</label>
          <div className={styles.inputOnly}>
            <input type="text" id="phoneNumber" max="99999999999" name='phoneNumber' value={formData.phoneNumber} required onChange={handleChange} placeholder='-를 빼고 입력해주세요.'/>
          </div>
          <span></span>
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
