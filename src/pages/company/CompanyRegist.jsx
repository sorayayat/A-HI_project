import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Button } from 'antd';
import style from './CompanyRegist.module.css';
import { Link } from 'react-router-dom';

function CompanyRegist() {
    const [isOpen, setIsOpen] = useState(false);
    const [q1, setQ1] = useState('');
    const [q3, setQ3] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [selectedJob, setSelectedJob] = useState("직무");
    const [education, setEducation] = useState("학력");
    const [selectedCareer, setSelectedCareer] = useState([]);



    useEffect(() => {
        document.body.classList.add(style.companyRegistBody);
        window.scrollTo(0, 0)
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

    const handleJobChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);

        setSelectedJob(selectedValue);
    };

    const handleEducationChange = (e) => {

        const selectedValue = e.target.value;
        console.log(selectedValue);

        setEducation(selectedValue)
    }

    const handleCareerChange = (value) => {
        if (selectedCareer.includes(value)) {
            // 이미 선택된 경우, 선택 해제
            setSelectedCareer(selectedCareer.filter(item => item !== value));
        } else {
            // 선택되지 않은 경우, 선택 추가
            setSelectedCareer([...selectedCareer, value]);
        }
    };



    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.title}>
                    <h1>&lt; &nbsp;채용 공고 등록</h1>
                </div>

                <div className={style.detailsContainer}>
                    <div style={{ padding: '20px' }}>직무 / 직군</div>
                    <select name="job" id={style.job} value={selectedJob} onChange={handleJobChange}>
                        <option value="직무">직군/직무</option>
                        <option value="프론트앤드">프론트앤드</option>
                        <option value="백">백</option>
                        <option value="풀스택">풀스택</option>
                    </select>

                    <div className={style.education}>
                        <div style={{ padding: '20px' }}>학력</div>
                        <select name="job" id={style.job} value={education} defaultValue="직무" onChange={handleEducationChange}>
                            <option value="학력무관">학력무관</option>
                            <option value="고등학교 졸업">고등학교 졸업</option>
                            <option value="대학졸업(2,3년)">대학졸업(2,3년)</option>
                            <option value="대학졸업(4년)">대학졸업(4년)</option>
                            <option value="대학원 석사졸업">대학원 석사졸업</option>
                            <option value="대학원 박사졸업">대학원 박사졸업</option>
                        </select>
                    </div>

                    <div className={style.career}>
                        <div style={{ padding: '20px' }}>경력</div>
                        <div className={style.careerCheckBox}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="신입"
                                    checked={selectedCareer.includes("신입")}
                                    onChange={() => handleCareerChange("신입")}
                                />
                                신입
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="1년 이상"
                                    checked={selectedCareer.includes("1년 이상")}
                                    onChange={() => handleCareerChange("1년 이상")}
                                />
                                1년 이상
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="3년 이상"
                                    checked={selectedCareer.includes("3년 이상")}
                                    onChange={() => handleCareerChange("3년 이상")}
                                />
                                3년 이상
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="5년 이상"
                                    checked={selectedCareer.includes("5년 이상")}
                                    onChange={() => handleCareerChange("5년 이상")}
                                />
                                5년 이상
                            </label>
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

                    <div className={style.skill} style={{ padding: '20px' }}>
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

                    <div className={style.condition} style={{ padding: "20px" }}>
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

                <Link to="/companyList/companyRegist/writeInfo" className={style.nextButton}>다음</Link>
            </div>
        </>
    );
}

export default CompanyRegist;
