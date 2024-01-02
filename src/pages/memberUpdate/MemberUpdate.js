import React, { useEffect, useState } from 'react';
import styles from './memberUpdateForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    id:"",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('/api/member/info');
      const data = response.data;
      setFormData({
        email: data.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        id:data.id,
      });
    };

    fetchUserInfo();
  }, []);

  const handlePhoneNumberCheck = () => {
      axios.get(`./api/phoneNumber_duplication_check?phoneNumber=${formData.phoneNumber}`)
          .then(response => {
            
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          })
          .finally(() => {
          });


  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    axios.put(`./api/member/info_update`,formData)
    .then(response => {
      const updatedUserInfo = {
        ...JSON.parse(sessionStorage.getItem('userInfo')),
        ...formData
      };
      sessionStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      alert('정보수정완료');
      navigate('/');
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    })
  };







  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>정보수정</h2>

        <div className={styles.inputContainer}>
          <label htmlFor="email">이메일</label>
          <div className={styles.inputOnly}>
            <input type="text" id="email" readOnly value={formData.email} />
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="name">이름</label>
          <div className={styles.inputOnly}>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange} 
              value={formData.name}
              required
            />
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="phoneNumber">전화번호</label>
          <div className={styles.inputOnly}>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              minLength={10}
              maxLength={11}
              onChange={handleChange} // onChange 이벤트 핸들러 수정
              value={formData.phoneNumber}
              required
            />
            <button onClick={handlePhoneNumberCheck}>중복확인</button>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <button className={styles.joinBtn} onClick={handleSubmit}>정보수정</button>
        </div>
      </div>
    </div>
  );
};

export default MemberUpdate;
