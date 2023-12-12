import style from './CreateResume.module.css'
import { useEffect } from 'react';

function CreateResume() {
    
    useEffect(() => {
        document.body.classList.add(style.createResumeBody);

        return () => {
        document.body.classList.remove(style.createResumeBody);
        };

    }, []); 
    
    return (
        <div className={style.createResumeBody}>
            <div className={style.formBox}>
                <header className={style.header}>
                    <div className={style.logo}>JGS</div>
                </header>
                
                <div className={style.profileSection}>
                    <div className={style.profileImage}></div> {/* 배경 이미지로 처리 */}
                    <div className={style.profileInfo}>
                        <div className={style.profileName}>박지혜</div>

                    <div className={style.profileContents}> 
                    <span className={style.icon}>&#9993;</span> {/* 이메일 아이콘 */}
                            <span className={style.profileEmail}>abc123@gmail.com</span>
                            <button className={style.editButton}>&#9998;</button> {/* 수정 아이콘 */}
                    </div>

                    <div className={style.profileContact}>
                    <span className={style.icon}>&#9742;</span> {/* 휴대폰 아이콘 */}
                            <span className={style.profilePhone}>.  010-0000-0000</span>
                            <button className={style.editButton}>&#9998;</button> {/* 수정 아이콘 */}
                    </div>

                    <div className={style.profileContact}>
                        <span className={style.icon}>&#x25A0;</span> {/* 생년월일 아이콘 */}
                        <input id="userBirth" type="date" className={style.profileBirthday} placeholder="생년월일" />
                    </div>
                    
                    </div>
                </div>

                <div className={style.userInfoSection}>
                    <div className={style.userInfoField}>
                        <label htmlFor="userJob">개발 직군</label>
                        <input id="userJob" type="text" className={style.inputField} placeholder="직군을 입력해 주세요." />
                    </div>

                    <div className={style.userInfoField}>
                        <label htmlFor="userSkill">기술 스택</label>
                        <input id="userSkill" type="text" className={style.inputField} placeholder="기술 스택을 입력해 주세요." />
                    </div>
                </div>

                <div className={style.userInfoField}> {/* 학력 섹션 */}
                    <label htmlFor="userEducation">학력</label>
                    <input id="userEducation" type="text" className={style.inputField} placeholder="학교 이름을 입력해 주세요." />
                    <input id="userMajor" type="text" className={style.inputField} placeholder="전공을 입력해 주세요." />
                    <input id="userGraduationYear" type="text" className={style.inputField} placeholder="졸업 연도를 입력해 주세요." />
                </div>

                <div className={style.userInfoField}> {/* 경력 섹션 */}
                    <label htmlFor="userCareer">경력</label>
                    <input id="userCareer" type="text" className={style.inputField} placeholder="회사 이름을 입력해 주세요." />
                    <input id="userPosition" type="text" className={style.inputField} placeholder="직책을 입력해 주세요." />
                    <input id="userPeriod" type="text" className={style.inputField} placeholder="근무 기간을 입력해 주세요." />
                </div>

                <div className={style.userInfoField}> {/* 첨부 파일 섹션 */}
                    <label htmlFor="userAttachment">첨부 파일</label>
                    <input id="userAttachment" type="file" className={style.inputFile} />
                </div>

                <div className={style.buttonGroup}>
                    <button className={style.saveButton}>저장하기</button>
                    <button className={style.submitButton}>제출하기</button>
                </div>
            </div>
        </div>
    );
}

export default CreateResume