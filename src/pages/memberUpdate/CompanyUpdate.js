import React, { useEffect, useState } from 'react';
import styles from './companyUpdate.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    id:"",
    company:"",
    companyType:"",
    employeesNumber:"",
    establishmentDate:"",
    companyHomepage:"",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('/api/member/infoCompany');
      const data = response.data;
      setFormData({
        email: data.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        id:data.id,
        company:data.company,
        companyType:data.companyType,
        employeesNumber:data.employeesNumber,
        establishmentDate:data.establishmentDate,
        companyHomepage:data.companyHomepage,
      });
    };

    fetchUserInfo();
  }, []);

  const handlePhoneNumberCheck = () => {
      axios.get(`./api/phoneNumber_duplication_check?phoneNumber=${formData.phoneNumber}`)
          .then(response => {
            alert(response.data);
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
    axios.put(`./api/member/company_info_update`,formData)
    .then(response => {
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
          <label htmlFor="name">담당자명</label>
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
              type="number"
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
          <label htmlFor="company">회사명</label>
          <div className={styles.inputOnly}>
            <input type="text" id="company" name="company" value={formData.company} required onChange={handleChange}/>
          </div>
          <span></span>
        </div>
        

        <div className={styles.inputContainer}>
          <label htmlFor="companyType">기업형태</label>
          <div className={styles.inputOnly}>
          <select id="companyType" name="companyType" className={styles.selectType}   value={formData.companyType} required 
      onChange={handleChange}>
    <option value="micro">5인 이하</option>
    <option value="small">중소기업</option>
    <option value="medium">중견기업</option>
    <option value="large">대기업</option>
    <option value="global">글로벌기업</option>
</select>
          </div>
          <span></span>
        </div>

<div className={styles.inputContainer}>
          <label htmlFor="employeesNumber ">직원수</label>
          <div className={styles.inputOnly}>
            <input type="number" id="employeesNumber" max="99999999999" name='employeesNumber' value={formData.employeesNumber} required onChange={handleChange} placeholder='몇명의 직원이 근무중인가요?'/>
          </div>
          <span></span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="establishmentDate">설립일</label>
          <div className={styles.inputOnly}>
            <input type="date" id="establishmentDate" name="establishmentDate" value={formData.establishmentDate} required onChange={handleChange} className={styles.establishmentDate}/>
          </div>
          <span></span>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="companyHomepage">홈페이지</label>
          <div className={styles.inputOnly}>
            <input type="text" id="companyHomepage" name="companyHomepage" value={formData.companyHomepage} required onChange={handleChange}/>
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

export default CompanyUpdate;
