import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import {  Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './authActions';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

        axios.post(`/login`,formData.toString())
            .then(response => {
              console.log(response.data.memberEntity);
                if(response.data.memberEntity.password==='N'){
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userInfo', JSON.stringify(response.data)); 

                    // 여기에서 dispatch를 사용하여 사용자 정보를 저장
                    dispatch(login({ email: response.data.memberEntity.email }));

                    alert("로그인 성공");
                    // dispatch(login());
                    navigate('/');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    // 서버에서 보낸 실패 메시지 사용
                    alert(error.response.data.message);
                } else {
                    // 기타 에러 처리
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
        </div>
      </div>
        </form>
    );
};

export default LoginForm;