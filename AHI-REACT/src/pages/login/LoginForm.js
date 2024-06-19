import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import {  Link,useNavigate } from "react-router-dom";
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;
const LoginForm = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append('username', loginData.username);
        formData.append('password', loginData.password);

        axios.post(`http://${serverIp}:${serverPort}/login`,formData.toString(),{ withCredentials: true })
            .then(response => {

                if(response.data.memberEntity.password==='N'){
                    sessionStorage.setItem('userInfo', JSON.stringify(response.data.memberEntity));
                    navigate('/');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert(error.response.data.message);
                } else {
                    console.error('로그인 요청 에러: ', error);
                }
            })
            .finally(() => {
            });
    };


    return (
        <form onSubmit={handleSubmit}>
        <div className={styles.loginFormContainer}>
        <h2>로그인</h2>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.loginLabel}>이메일</label>
            <input type="text" id="username" name='username' className={styles.loginInput}  onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.loginLabel}>비밀번호</label>
            <input type="password" id="password" name='password' className={styles.loginInput}  onChange={handleChange} />
          </div>
          <button type="submit" className={styles.loginBtn}>로그인</button>
        <div className={styles.links}>
        <Link to="/findForm">ID/PW찾기</Link>
          <Link to="/joinForm">회원가입</Link>
          <Link to="/joinFormCompany">비지니스 회원가입</Link>
        </div>
      </div>
        </form>
    );
};

export default LoginForm;