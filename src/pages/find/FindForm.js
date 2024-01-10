import styles from './FindForm.module.css';
import {  Link } from "react-router-dom";
import { useState,React } from "react";
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;
const FindForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    }


const findData = () =>{
  axios.post(`http://${serverIp}:${serverPort}/api/find_info`,formData)
  .then(response => {
    if(response.data.check==='success'){
      setFormData({ ...formData, email: response.data.email });
    }else if(response.data.check==='fail'){
      alert("전화번호를 확인해 주세요");
    }
  })
  .catch(error => {
    console.error('Error fetching data: ', error);
  })
}

const findPwd =() =>{
  axios.put(`http://${serverIp}:${serverPort}/api/find_pwd`,formData)
  .then(response => {
    if(response.data.check==='success'){
      
    }else if(response.data.check==='fail'){
    }
  })
  .catch(error => {
    console.error('Error fetching data: ', error);
  })
}

    return (
<div className={styles.findFormContainer}>
  <h2>ID/PW 찾기</h2>
  <label htmlFor="phoneNumber" className={styles.labelEmail}>이메일 찾기</label>
  <div className={styles.inputWithButton}>
          <input type="number" id="phoneNumber" name="phoneNumber"className={styles.findInput} placeholder='전화번호를  - 빼고 입력하세요' value={formData.phoneNumber}  onChange={handleChange}  />
            <button className={styles.findBtn} onClick={findData}>E-MAIL찾기</button>
          </div>
          <div></div>
          <label htmlFor="email" className={styles.labelEmail}>비밀번호 찾기</label>
          <div className={styles.inputWithButton}>
            <input type="text" id="email"name="email" className={styles.findInput} placeholder='이메일을 입력하세요'value={formData.email}  onChange={handleChange}/>
            <button className={styles.findBtn} onClick={findPwd}>PW찾기</button>
          </div>
          <div></div>
          <div className={styles.links}>
          <Link to="/loginForm">로그인</Link>
        </div>
</div>

    );
};

export default FindForm;