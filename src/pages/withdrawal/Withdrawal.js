import React , { useEffect, useState }from 'react';
import styles from './withdrawal.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Withdrawal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    id: "",
  });
  
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('/api/member/info');
      const data = response.data;
      console.log(data);
      setFormData({
        email: data.email,
        id:data.id,
      });
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
  
    if (isConfirmed) {
  
      axios.delete(`./api/member/withdrawal`, { data: formData })
      .then(response => {
        sessionStorage.setItem('isLoggedIn', 'false');
        sessionStorage.removeItem('userInfo');
        alert('탈퇴 처리 되었습니다.');
        navigate('/');
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (



        <div className={styles.findFormContainer}>
  <h2>회원탈퇴</h2>
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
  <button className={styles.findBtn} onClick={handleSubmit}>탈퇴</button>
          </div>
          <div></div>
</div>
    );
};

export default Withdrawal;