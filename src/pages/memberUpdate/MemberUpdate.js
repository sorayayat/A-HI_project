import React, { useEffect, useState } from 'react';
import styles from './memberUpdateForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberUpdate = () => {
  const navigate = useNavigate();
  const [isPhoneChecked, setIsPhoneChecked] = useState(true);
  const [originalNumber, setOriginalNumber] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    id:"",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('/api/in/member/info');
      const data = response.data;
      setOriginalNumber(data.phoneNumber);
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
    if(formData.phoneNumber===originalNumber){
      setIsPhoneChecked(true);
      alert("기존 전화번호입니다.");
      return;
    }
    if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 12) {
      alert("전화번호는 최소 10자리 이상 11자리 이하여야 합니다.");
      return;
    }
    axios.get(`/api/phoneNumber_duplication_check?phoneNumber=${formData.phoneNumber}`)
          .then(response => {
            if(response.data===true) {
              alert("등록 가능한 번호 입니다.");
              setIsPhoneChecked(true);
            }else{
              alert("기 등록된 번호 입니다.")
              setIsPhoneChecked(false);
            }
            
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          })
          .finally(() => {
          });


  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber'){
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setIsPhoneChecked(false);
      setFormData({ ...formData, [name]: sanitizedValue });
    }else{
      setFormData({ ...formData, [name]: value });
    }


    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.phoneNumber===originalNumber){
      setIsPhoneChecked(true);
    }
    if(!isPhoneChecked){
        alert("전화번호 중복확인을 해주세요.");
        return;
    }

    if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 12) {
      alert("전화번호는 최소 10자리 이상 11자리 이하여야 합니다.");
      return;
    }
    axios.put(`/api/in/member/info_update`,formData)
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
          <label htmlFor="phoneNumber" >전화번호</label>
          <div className={styles.inputWithButton}>
          <div className={styles.inputOnly}>
          <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              minLength={10}
              maxLength={11}
              onChange={handleChange} 
              value={formData.phoneNumber}
              required
            />
            </div>
            <button className={styles.joinBtn} onClick={handlePhoneNumberCheck}  type='button'>중복확인</button>
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <button className={styles.joinBtn} onClick={handleSubmit}>정보수정</button>
        </div>
      </div>
    </div>
  );
};

export default MemberUpdate;
