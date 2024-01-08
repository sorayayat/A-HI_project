import style from './CompanyDetails.module.css';
import { useEffect, useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useDispatch , useSelector } from 'react-redux';
import { callUpdatePostingLike , callGetLikeState , callDeletePosting} from '../../apis/postingAPICalls'
import Swal from 'sweetalert2';


function CompanyDetails() {

    const { state } = useLocation();
    const posting = state?.posting
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [isLiked, setIsLiked] = useState(null);
    
    const earlyPostingLike = useSelector(state => state.companyReducer.getLike);
    const postingLike = useSelector(state => state.companyReducer.putUpdalike);

    

    useEffect(() => {

        setIsLiked(earlyPostingLike?.data)

    },[earlyPostingLike])

    const modules = {
        toolbar: false, // 툴바 모듈 비활성화 (버튼 없음)
    };

    const quillStyle = {
        width: "100%",
        height: "auto",
        marginTop: "30px",
        boxShadow: "1px 5px 20px rgba(0, 0, 0, 0.1)"
    }


    useEffect(() => {
        document.body.classList.add(style.companyDetailsBody);
        window.scrollTo(0, 0)
        dispatch(callGetLikeState({
            memberCode: 3,
            postingCode: posting.postingCode
        }))

        return () => {
            document.body.classList.remove(style.companyDetailsBody);
        };
    }, [postingLike]);


    const onClickPostingScrapHandler = () => {

        console.log(posting.postingCode);
        

        dispatch(callUpdatePostingLike({
            memberCode: 3,
            postingCode: posting.postingCode
        }))

        setIsLiked((prevIsLiked) => !prevIsLiked);
    }

    const onClickDeleteHandler = (postingCode) => {

        
        dispatch(callDeletePosting({

            postingCode : postingCode
        }))

        Swal.fire({
            text: '삭제완료',
            showCancelButton: false, // 취소 버튼 비활성화
            confirmButtonText: '확인', // 확인 버튼 텍스트 지정
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼이 눌렸을 때 페이지 이동
                navigate('/companyList');
            }
        });

    }

    return (
        <>
            <div className={style.navBar}>
                <Link to="jobPosting" spy={true} smooth={true} duration={500} className={style.navItem}>
                    채용 공고
                </Link>
                <Link to="details" spy={true} smooth={true} duration={500} className={style.navItem}>
                    상세 정보
                </Link>
                <Link to="companyInfo" spy={true} smooth={true} duration={500} className={style.navItem}>
                    기업 정보
                </Link>
            </div>

            <div className={style.mainContainer}>
                <h1 id="jobPosting" style={{ marginBottom: '-70px' }}>채용 정보</h1>

                <div className={style.companyInfoContainer}>
                    <div>
                        <div className={style.titleText1}>
                            <p>{posting.postingTitle}</p>
                        </div>
                    </div>
                    <div className={style.companyInfo}>
                        <div className={style.titleText2}>
                            <p>지원 자격</p>
                            <div>학력 : {posting.education}</div>
                            <div>스킬: {posting.skillList.map((skill, index) => (
                                <span key={index}>{skill.skillName}{index < posting.skillList.length - 1 ? ', ' : ''}</span>
                            ))}</div>
                            <div>경력 : {posting.postingExperienceList.map((experience, index) => (
                                <span key={index}>{experience.experienceLevel}{index < posting.postingExperienceList.length -1 ? ',' : ''}</span>))}</div>
                        </div>
                        <div className={style.titleText3}>
                            <p>근무 조건</p>
                            <div>{posting.workTypeList.map((workType, index) => (
                                <span key={index}>{workType.workConditions}{index < posting.workTypeList.length -1 ? ',' : ''}</span>))}  </div>
                        </div>
                    </div>
                </div>

                <button className={isLiked? style.sendButton : style.clickButton} onClick={onClickPostingScrapHandler} >{isLiked ? '☆' : '★'}  스크랩</button>

                <div id="details" className={style.detailsContainer}>
                    <div className={style.details}>
                        <p>상세정보</p>
                        <div className={style.quill}>
                            <ReactQuill style={ quillStyle}

                            value={ posting.content}
                            readOnly={true}
                            modules={modules}
                            />
                        </div>
                        </div>
                    
                </div>

                <div id="companyInfo" className={style.companyProfileContainer}>
                    <div className={style.companyInfomation}><p>기업 정보</p></div>

                    <div className={style.companyInfoDetails}>
                        
                        <div>회사명: {posting.company.company}</div>
                        <div>기업 형태 : {posting.company.companyType}</div>
                        <div>사원수 : {posting.company.employeesNumber}</div>
                        <div>설립일 : {posting.company.establishmentDate}</div>
                        <div>대표 이름 :{posting.company.name}</div>
                        <div>기업 페이지: <a href={posting.company.companyHomepage} target="_blank" rel="noopener noreferrer">{posting.company.companyHomepage}</a></div>
                        <div>상세 주소 :{posting.location}</div>

                    </div>
                </div>

                <button className={style.deleteButton} onClick={() =>onClickDeleteHandler(posting.postingCode)}>삭제</button>
            </div>
        </>
    );
}

export default CompanyDetails;
