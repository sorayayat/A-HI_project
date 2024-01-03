import React, { useEffect, useState } from 'react';
import styles from './companyUpdate.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyUpdate = () => {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState("");
  const [isPhoneChecked, setIsPhoneChecked] = useState(true);
  const [originalNumber, setOriginalNumber] = useState("");
  const [formData, setFormData] = useState({
    memberId: "",
    email: "",
    name: "",
    phoneNumber: "",
    companyId:"",
    company:"",
    companyType:"",
    employeesNumber:0,
    establishmentDate:"",
    companyHomepage:"",
    logo: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('/api/member/infoCompany');
      const data = response.data;
      setOriginalNumber(data.phoneNumber);
      setFormData({
        email: data.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        companyId:data.companyId,
        company:data.company,
        companyType:data.companyType,
        employeesNumber:data.employeesNumber,
        establishmentDate:data.establishmentDate,
        companyHomepage:data.companyHomepage,
        logo: response.data.logo,
        memberId:response.data.memberId,
      });
      setLogoPreview(`http://localhost:8001/logoimg/`+response.data.logoServer);
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
    
    axios.get(`./api/phoneNumber_duplication_check?phoneNumber=${formData.phoneNumber}`)
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
    const data = new FormData();
    for (const key in formData) {
      if (key !== 'logo') {
        data.append(key, formData[key]);
      }
    }
    if (formData.logo instanceof File) {
      data.append('logo', formData.logo);
    }
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
    axios.put(`/api/member/company_info_update`, data)
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



  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.type.substr(0, 5) === "image") {
            setFormData({ ...formData, logo: file });
            setLogoPreview(URL.createObjectURL(file));
        } else {
            alert("양식에 맞는 이미지 파일을 올려주세요.");
            e.target.value = ""; // input 필드 초기화
        }
    } else {
        // 이미지 파일이 선택되지 않은 경우
        setFormData({ ...formData, logo: null });
        setLogoPreview(null);
    }
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
            <input type="number" id="employeesNumber" min="1"  name='employeesNumber' value={formData.employeesNumber} required onChange={handleChange} placeholder='몇명의 직원이 근무중인가요?'/>
          </div>
          <span></span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="establishmentDate">설립일</label>
          <div className={styles.inputOnly}>
            <input type="date" id="establishmentDate" name="establishmentDate" min="1602-01-01" 
  max={new Date().toISOString().split("T")[0]}  value={formData.establishmentDate} required onChange={handleChange} className={styles.establishmentDate}/>
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
          <label htmlFor="logo">회사로고</label>
          <div className={styles.inputOnly}>
            <input type="file" id="logo" onChange={handleLogoChange} accept="image/*" />
          </div>
          {logoPreview && <img src={logoPreview} alt="Logo Preview" className={styles.logoPreview} />}
           
        </div>



        <div className={styles.inputContainer}>
          <button className={styles.joinBtn} onClick={handleSubmit}>정보수정</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyUpdate;
