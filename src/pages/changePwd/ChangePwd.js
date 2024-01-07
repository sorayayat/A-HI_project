import React, { useEffect, useState } from 'react';
import styles from './changePwd.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePwd = () => {
  let user = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: user.email,
    password: "",
    id: user.id,
  });
  const [newData, setNewData] = useState({
    id:user.id,
    password:"",
    confirmPwd:"",
  });
  const [isPasswordChanged, setIsPasswordChanged] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault(); 
    axios.post(`/api/in/member/before/changePwd`, formData)
      .then(response => {
        if (response.data === true) {
          setIsPasswordChanged(true);
        } else {
          setIsPasswordChanged(false);
          alert('비밀번호를 확인해 주세요.');
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setIsPasswordChanged(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "newPwd") {
      setNewData(prevData => ({
        ...prevData,
        password: value
      }));
    } else if (name === "confirmPwd") {
      setNewData(prevData => ({
        ...prevData,
        confirmPwd: value
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(newData.confirmPwd!==newData.password){
      alert('비밀번호와 비밀번호확인은 같은 값이어야 합니다.');
      return;
    }else if(newData.password.length < 10 || newData.password.length > 25 ||
      newData.confirmPwd.length < 10 || newData.confirmPwd.length > 25){
  alert('비밀번호는 10자리이상 25자리 이하여야 합니다.');
  return;
}

    axios.put(`/api/in/member/changePwd`, newData)
    .then(response => {
      if (response.data === true) {
         navigate('/');
      } else {
        alert('비밀번호 변경 실패 ');
      }
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      setIsPasswordChanged(false);
    });
  };
  return (
    <div className={styles.findFormContainer}>
      <h2>비밀번호 변경</h2>
      <div></div>
      <label htmlFor="password" className={styles.labelEmail}>본인확인</label>
      <div className={styles.inputWithButton}>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.findInput}
          placeholder='비밀번호를 입력하세요'
          onChange={handleChange}
        />
        <button className={styles.findBtn} onClick={handleSearch}>확인</button>
      </div>
    
      <div>  {isPasswordChanged && (
        <>
         <label htmlFor="newPwd" className={styles.labelEmail}>변경할 비밀번호</label>
         <div className={styles.inputWithButton}>
         <input
           type="password"
           id="newPwd"
           name="newPwd"
           className={styles.findInput}
           placeholder='변경할 비밀번호를 입력하세요'
           onChange={handleChange2}
           minLength={10}
         />
       </div>
       <label htmlFor="confirmPwd" className={styles.labelEmail}>비밀번호 확인</label>
       <div className={styles.inputWithButton}>
         <input
           type="password"
           id="confirmPwd"
           name="confirmPwd"
           className={styles.findInput}
           placeholder='변경할 비밀번호와 같은값을 입력하세요'
           onChange={handleChange2}
           minLength={10}
         />
       </div>
       <div className={styles.inputWithButton}>
       <button type="submit" className={styles.changeBtn} onClick={handleSubmit}>비밀번호변경</button>
      </div>
       </>
      )}</div>
    </div>
  );
};

export default ChangePwd;
