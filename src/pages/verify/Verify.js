import React, { useState, useEffect } from 'react';
import styles from './Verify.module.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;
const Verify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
      token:"",
      id:"",
    });

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      const id = queryParams.get('id');

      if (token && id) {
        setFormData({ token: token, id: id });
        verifyToken(token, id);
      }
    }, [location]);

    const verifyToken = (token, id) => {
      axios.put(`http://${serverIp}:${serverPort}/api/confirmCheck`, { token, id })
        .then(response => {
           if(response.data===true){
            setTimeout(() => {
              navigate("/loginForm");
            }, 2000); 
           }else{
            alert("이메일 인증에 실패 했습니다.");
           }

        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                alert(error.response.data.message);
            } else {
                console.error('메일인증에러: ', error);
            }
        })
        .finally(() => {
            // 추가적인 로직
        });
    };

    return (
        <div className={styles.loginFormContainer}>
        <h2>메일이 인증되었습니다.</h2>
        </div>
    );
};

export default Verify;
