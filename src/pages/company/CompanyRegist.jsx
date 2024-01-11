import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Modal, Button } from 'antd';
import style from './CompanyRegist.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Swal from 'sweetalert2';


function CompanyRegist() {

    const [isOpen, setIsOpen] = useState(false);
    const [q1, setQ1] = useState('');
    const [q3, setQ3] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [selectedJob, setSelectedJob] = useState("프론트앤드");
    const [education, setEducation] = useState("학력무관");
    const [selectedCareer, setSelectedCareer] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const navigate = useNavigate();
    const [postingTitle, setPostingTitle] = useState('');
    const [date, setDate] = useState();
    const [deadLine, setDeadLine ] = useState('상시채용');
    

    const skillList = ["C","C#" ,"C++","HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Node.js", "Python", "Ruby"
        , "Java", "MySQL", "PostgreSQL", "MongoDB", "Apache", "Nginx", "Git" , "MachineLearning" ,"TensorFlow",
    "PyTorch" , "Slack" , "Kotlin" , "WebRTC" , "MVVM" , "Confluence" , "Jira" , "Spring Data JPA" , "REST API" , "AWS"
    ,"QueryDSL" ,"Jenkins" , "TypeScript" , "Spring" ,"Docker" , "Oracle" ,"Linux"];

    const conditionList = ["재택가능", "정규직", "주 5일(월~금)", "주 6일(월~토)", "주 3일(격일제)",
        "유연 근무제", "면접후 결정", "2600~", "2800~", "3000~"];



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

            setSelectedCareer(selectedCareer.filter(item => item !== value));
        } else {

            setSelectedCareer([...selectedCareer, value]);
        }
    };

    const handleSkillChange = (skill) => {
        if (selectedSkills.includes(skill)) {

            setSelectedSkills(selectedSkills.filter(item => item !== skill));
        } else {

            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleConditionChange = (value) => {
        if (selectedConditions.includes(value)) {

            setSelectedConditions(selectedConditions.filter(item => item !== value));

        } else {

            setSelectedConditions([...selectedConditions, value]);


        }

    };

    const onChangePostingTitleHandler = (e) => {

        setPostingTitle(e.target.value)

    }

    const handleDeadlineChange = (e) => {
        
        setDeadLine(e.target.value)

    }


    const handleNextClick = () => {

        if (!postingTitle || !q1 || !q3 || !detailAddress || !selectedJob || !education || !selectedCareer.length || !selectedSkills.length || !selectedConditions.length || !date || !deadLine) {
            // 필수 입력 항목이 누락된 경우 알림창 표시
            Swal.fire({
                icon: 'error',
                title: '정보를 모두 입력해주세요',
            });
            return;
        }

        const dataObject = {
            q1,
            q3,
            detailAddress,
            selectedJob,
            education,
            selectedCareer,
            selectedSkills,
            selectedConditions,
            postingTitle,
            date,
            deadLine,
        };

        navigate("/companyList/companyRegist/writeInfo", {
            state: { dataObject: dataObject }
        });
    };

    const handleDateChange = (newDate) => {

        const formattedDate = newDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        
        console.log(formattedDate);
        setDate(formattedDate);
          
        
        };





    return (
        <>
            <div className={style.mainContainer}>
                <div className={style.title}>
                    <h1>&lt; &nbsp;채용 공고 등록</h1>
                </div>

                <div className={style.detailsContainer}>

                    <div className={style.postingTitle}>공고 제목</div>
                    <label>
                        <input type="text" className={style.postingTitleText} placeholder="공고의 제목을 입력해주세요"
                            onChange={onChangePostingTitleHandler} />
                    </label>

                    <div style={{ padding: '20px' }}>직무 / 직군</div>
                    <select name="job" id={style.job} value={selectedJob} onChange={handleJobChange}>
                        <option value="프론트앤드">프론트앤드</option>
                        <option value="백">백</option>
                        <option value="풀스택">풀스택</option>
                        <option value="안드로이드 앱">안드로이드 앱</option>
                    </select>

                    <div className={style.education}>
                        <div style={{ padding: '20px' }}>학력</div>
                        <select name="job" id={style.job} value={education} defaultValue="학력" onChange={handleEducationChange}>
                            <option value="학력무관">학력무관</option>
                            <option value="고등학교 졸업">고등학교 졸업</option>
                            <option value="대학졸업(2,3년)">대학졸업(2,3년)</option>
                            <option value="대학졸업(4년)">대학졸업(4년)</option>
                            <option value="대학원 석사졸업">대학원 석사졸업</option>
                            <option value="대학원 박사졸업">대학원 박사졸업</option>
                        </select>
                    </div>

                    <div className={style.closingForm}>
                        <div style={{ padding: "20px" }}>마감 형식</div>
                        <select name="job" id={style.job} value={deadLine} defaultValue="마감 형식" onChange={handleDeadlineChange}>
                            <option value="상시 채용">상시채용</option>
                            <option value="채용시 마감">채용시 마감</option>
                            <option value="선착순 마감">선착순 마감</option>

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
                            {skillList.map(skill => (
                                <label key={skill}>
                                    <input
                                        type='checkbox'

                                        onChange={() => handleSkillChange(skill)}
                                    />
                                    {skill}
                                </label>
                            ))}

                        </div>
                    </div>

                    <div className={style.condition} style={{ padding: "20px" }}>
                        <div>근무조건</div>
                        <div className={style.conditionCheckbox}>
                            {conditionList.map(condition => (
                                <label key={condition}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleConditionChange(condition)}
                                    />
                                    {condition}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={style.endDate}>공고 마감일</div>

                    <div className={style.calendarContainer}>
                        
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            className={style.customCalendar}
                            formatDay={(locale, date) => moment(date).format('D')}
                        />
                        <input type='text' className={style.calendarValue} value={date || ''}></input>


                    </div>

                </div>

                <div onClick={handleNextClick} className={style.nextButton}>다음</div>
            </div>
        </>
    );
}

export default CompanyRegist;
