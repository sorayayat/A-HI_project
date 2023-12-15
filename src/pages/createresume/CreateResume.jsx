import style from './CreateResume.module.css'
import { useEffect, useState } from 'react';



function CreateResume() {

    const [profileName, setProfileName] = useState('박지혜');
    const [profileEmail, setProfileEmail] = useState('abc123@gmail.com');

    const [profileImage, setProfileImage] = useState(null);

    const [editMode, setEditMode] = useState({
        name: false,
        email: false
    });


    // 수정 가능한 상태로 전환하는 함수
    const handleEdit = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    // 입력값 변경 핸들러
    const handleChange = (field, value) => {
        switch (field) {
            case 'name':
                setProfileName(value);
                break;
            case 'email':
                setProfileEmail(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.body.classList.add(style.createResumeBody);

        return () => {
            document.body.classList.remove(style.createResumeBody);
        };

    }, []);

    // 프로필 이미지 변경 핸들러
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className={style.createResumeBody}>
            <div className={style.formBox}>
                <header className={style.header}>
                    <div className={style.logo}>JGS</div>
                </header>
                <div className={style.profileBox}> {/* 스타일을 적용할 컨테이너 */}
                    <div className={style.profileSection}>
                        <div className={style.profileImageWrapper}>
                            <img
                                src={profileImage || 'path/to/default-profile-image.jpg'}
                                alt="Profile"
                                className={style.profileImage}
                            />
                            <input
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="profileImageUpload"
                            />
                            <label htmlFor="profileImageUpload" className={style.fileEditButton}>
                                프로필 편집
                            </label>

                            <div className={style.profileContents}>
                                <div className={style.profileContents}>
                                <span className={style.icon}>&#128100;</span>
                                    {/* 이름 편집 기능 */}
                                    {editMode.name ? (
                                        <input
                                            type="text"
                                            id="profileName"
                                            value={profileName}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            onBlur={() => setEditMode({ ...editMode, name: false })}
                                        />
                                    ) : (
                                        <div className={style.profileName}>
                                            {profileName}
                                            <button className={style.editButton} onClick={() => handleEdit('name')}>&#9998;</button>
                                        </div>
                                    )}
                                    <span className={style.icon}>&#127874;</span>
                                    <div className={style.profileContact}>
                                        <input id="userBirth" type="date" className={style.profileBirthday} placeholder="생년월일" />
                                    </div>

                                    {/* 이메일 편집 기능 */}
                                    <span className={style.icon}>&#128231;</span>
                                    {editMode.email ? (
                                        <input
                                            type="text"
                                            id="profileEmail"
                                            value={profileEmail}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            onBlur={() => setEditMode({ ...editMode, email: false })}
                                        />
                                    ) : (
                                        <div className={style.profileEmail}>
                                            {profileEmail}
                                            <button className={style.editButton} onClick={() => handleEdit('email')}>&#9998;</button>
                                        </div>
                                    )}

                                    {/* 휴대폰 번호 (수정 불가) */}
                                    <span className={style.icon}>&#128222;</span>
                                    <div className={style.profilePhone} id="profilePhone">010-0000-0000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.userInfoSection}>
                    <div className={style.userInfoField}>
                        <label htmlFor="userJob">개발 직군</label>
                        <select id="userJob" className={style.dropdown}>
                            <option value="null">직무를 선택해 주세요.</option>
                            <option value="frontend">프론트엔드 개발자</option>
                            <option value="backend">백엔드 개발자</option>
                            <option value="fullstack">웹 풀스택 개발자</option>
                            <option value="android">안드로이드 개발자</option>
                            <option value="ios">IOS 개발자</option>
                            <option value="cross">크로스플랫폼 개발자</option>
                            <option value="game">게임 클라이언트 개발자</option>
                            <option value="dba">DBA</option>
                            <option value="bigdata">빅데이터 엔지니어</option>
                            <option value="ai">인공지능/머신러닝</option>
                            <option value="devops">devops/시스템 엔지니어</option>
                            <option value="security">정보 보안 담당자</option>
                            <option value="qa">QA 엔지니어</option>
                            <option value="pm">개발 PM</option>
                            <option value="hw">HW/임베디드</option>
                            <option value="sw">SW/솔루션</option>
                            <option value="webp">웹 퍼블리셔</option>
                            <option value="vrar3d">VR/AR/3D</option>
                            <option value="block">블록체인</option>
                            <option value="support">기술 지원</option>
                        </select>
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