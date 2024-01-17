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


    const [isLiked, setIsLiked] = useState(false);
    
    const earlyPostingLike = useSelector(state => state.companyReducer?.getLike);
    const postingLike = useSelector(state => state.companyReducer?.putUpdalike);

    const companyCodeJSON  = sessionStorage?.getItem("userInfo") ?? "{}";

    const parsedData = JSON.parse(companyCodeJSON);

    const companyCode = parsedData?.companyEntity?.companyId ?? "";

    console.log('companyCode' , companyCode);
    

    const memberCode = parsedData?.id;

    console.log('memberCode' , memberCode);

    
    
    
    

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
        boxShadow: "1px 5px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "25px",
        border: "none" 
    }


    useEffect(() => {
        document.body.classList.add(style.companyDetailsBody);
        window.scrollTo(0, 0)
        dispatch(callGetLikeState({
            memberCode: memberCode,
            postingCode: posting.postingCode
        }))

        return () => {
            document.body.classList.remove(style.companyDetailsBody);
        };
    }, [postingLike]);


    const onClickPostingScrapHandler = () => {

        if(memberCode === undefined) {

            navigate("/loginForm")
        }

        console.log(posting.postingCode);
        

        dispatch(callUpdatePostingLike({
            memberCode: memberCode,
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
                <h1 id="jobPosting" style={{ marginBottom: '-50px', marginTop: '50px', fontWeight: 700 }}>채용 정보</h1>

                <div className={style.companyInfoContainer}>
                    <div>
                        <div className={style.titleText1}>
                            <p>{posting?.postingTitle}</p>
                        </div>
                    </div>
                    <div className={style.companyInfo}>
                        <div className={style.titleText2}>
                            <p style={{ paddingBottom: '20px' }}><b>지원 자격</b></p>
                            <div className={style.requirement}>학력 : {posting?.education}</div>
                            <div className={style.requirement}>스킬: {posting?.skillList.map((skill, index) => (
                                <span key={index}>{skill.skillName}{index < posting?.skillList.length - 1 ? ', ' : ''}</span>
                            ))}</div>
                            <div className={style.requirement}>경력 : {posting?.postingExperienceList.map((experience, index) => (
                                <span key={index}>{experience.experienceLevel}{index < posting?.postingExperienceList.length -1 ? ',' : ''}</span>))}</div>
                            <div>포지션 : {posting?.position}</div>
                        </div>
                        <div className={style.titleText3}>
                            <p style={{ paddingBottom: '20px' }}><b>근무 조건</b></p>
                            <div>{posting?.workTypeList.map((workType, index) => (
                                <span key={index}>{workType.workConditions}{index < posting?.workTypeList.length -1 ? ',' : ''}</span>))}  </div>
                        </div>
                    </div>
                </div>

                <button className={isLiked? style.sendButton : style.clickButton} onClick={onClickPostingScrapHandler} >{isLiked ? '☆' : '★'}  스크랩</button>

                <div id="details" className={style.detailsContainer}>
                    <div className={style.details}>
                        <p>상세정보</p>
                        <div className={style.quillWrapper}>
                            <div className={style.quill}>
                                <ReactQuill style={ quillStyle }

                                value={ posting?.content}
                                readOnly={true}
                                modules={modules}
                                />
                            </div>
                        </div>
                        </div>
                    
                </div>

                <div id="companyInfo" className={style.companyProfileContainer}>
                    <div className={style.companyInfomation}><p>기업 정보</p></div>

                    <div className={style.companyInfoDetails}>
                        
                        <div><b>회사명</b>: {posting?.company?.company}</div>
                        <div><b>기업 형태</b> : {posting?.company?.companyType}</div>
                        <div><b>사원수</b> : {posting?.company?.employeesNumber}</div>
                        <div><b>설립일</b> : {posting?.company?.establishmentDate}</div>
                        <div><b>대표 이름</b> :{posting?.company?.name}</div>
                        <div><b>기업 페이지</b>: <a href={posting?.company?.companyHomepage} target="_blank" rel="noopener noreferrer">{posting?.company?.companyHomepage}</a></div>
                        <div><b>상세 주소</b> :{posting?.location}</div>

                    </div>
                </div>


            {posting?.company?.companyId === companyCode && (
                <button className={style.deleteButton} onClick={() => onClickDeleteHandler(posting?.postingCode)}>
                    삭제
                </button>
            )}
            </div>
        </>
    );
}

export default CompanyDetails;
