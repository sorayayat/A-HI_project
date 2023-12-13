import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Button } from 'antd';
import style from './CompanyRegist.module.css';

function CompanyRegist() {
    const [isOpen, setIsOpen] = useState(false);
    const [q1, setQ1] = useState('');
    const [q3, setQ3] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    

    useEffect(() => {
        document.body.classList.add(style.companyRegistBody);

        return () => {
            document.body.classList.remove(style.companyRegistBody);
        };
    }, []);

    const onToggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    const handleComplete = (data) => {
        setQ1(data.sido);
        setQ3(
            data.sigungu.length > 3
                ? data.sigungu.split('').splice(0, 3).join('')
                : data.sigungu
        );

        let splitAddress = data.address.split(' ').splice(2).join(' ');
        setDetailAddress(splitAddress);
        onToggleModal();
    };

    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.title}>
                    <h1>&lt; &nbsp;채용 공고 등록</h1>
                </div>

                <div className={style.detailsContainer}>
                    <div style={{ padding: '20px' }}>직무 / 직군</div>
                    <select name="job" id={style.job} defaultValue="직무">
                        <option value="직무">직군/직무</option>
                        <option value="프론트앤드">프론트앤드</option>
                        <option value="백">백</option>
                        <option value="">풀스택</option>
                    </select>

                    <div className={style.career}>
                        <div style={{ padding: '20px' }}>경력</div>
                        <div className={style.careerCheckBox}>
                            <input type="checkbox" />신입
                            <input type="checkbox" />1년 이상
                            <input type="checkbox" />3년 이상
                            <input type="checkbox" />5년 이상
                        </div>
                    </div>

                    <div className={style.companyAddress}>
                        <div style={{ padding: '20px ' }}>근무지</div>
                        <Button onClick={onToggleModal} className={style.addressButton}>주소 검색</Button>
                        <Modal visible={isOpen} onOk={onToggleModal} onCancel={onToggleModal}>
                            <DaumPostcode onComplete={handleComplete} />
                        </Modal>
                        
                        <input type='text' className={style.detailAddress} value={`${q1} ${q3} ${detailAddress}`}></input>
                        
                    </div>

                    <div className={style.skill} style={{padding : '20px'}}>
                        <div>지원자격</div>
                        <div className={style.skillCheckBox}>
                            <input type="checkbox" />HTML
                            <input type="checkbox" />CSS
                            <input type="checkbox" />JavaScript
                            <input type="checkbox" />React
                            <input type="checkbox" />Vue.js
                            <input type="checkbox" />Angular 
                            <input type="checkbox" />Node.js
                            <input type="checkbox" />Python
                            <input type="checkbox" />Ruby
                            <input type="checkbox" />Java 
                            <input type="checkbox" />MySQL 
                            <input type="checkbox" />Java 
                            <input type="checkbox" />PostgreSQL 
                            <input type="checkbox" />MongoDB  
                            <input type="checkbox" />Apache 
                            <input type="checkbox" />Nginx  
                            <input type="checkbox" />Git  
                            
                        </div>
                    </div>

                    <div className={style.condition} style={{padding : "20px"}}>
                        <div>근무조건</div>
                        <div className={style.conditionCheckbox}>
                            <input type="checkbox" />재택가능
                            <input type="checkbox" />정규직
                            <input type="checkbox" />주 5일(월~금)
                            <input type="checkbox" />주 6일(월~토)
                            <input type="checkbox" />주 3일(격일제) 
                            <input type="checkbox" />유연 근무제 
                            <input type="checkbox" />면접후 결정 
                            <input type="checkbox" />2600~ 
                            <input type="checkbox" />2800~ 
                            <input type="checkbox" />3000~

                            
                        </div>

                        
                    </div>
                </div>

                <button className={style.nextButton}>다음</button>
            </div>
        </>
    );
}

export default CompanyRegist;
