import style from './CompanyList.module.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callSelectJobListing } from '../../apis/postingAPICalls'
import { useDispatch, useSelector } from 'react-redux';
import { callSelectLikePosting } from '../../apis/recommendationAPICalls';

function Apply() {

    const dispatch = useDispatch();
    const posting = useSelector(state => state.companyReducer.getJoblist);
    const postingList = posting?.data?.data;
    const navigate = useNavigate();
    const postingLikeList = useSelector(state => state.recommendationReducer.postingLike);

    // const companyCode = localStorage.session("user")

    // console.log('companyCode' , companyCode);
    

    
    const pageInfo = posting?.data?.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];

    const companyCodeJSON  = sessionStorage?.getItem("userInfo")

    const parsedData = JSON.parse(companyCodeJSON);

    const companyCode = parsedData?.companyEntity?.companyId;

    const memberCode = parsedData?.id;

    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }


    const sortByPostingCode = (a, b) => b.postingCode - a.postingCode;


    useEffect(() => {
        document.body.classList.add(style.companyListBody);
        window.scrollTo(0, 0);

        dispatch(callSelectJobListing({
            currentPage : currentPage,
        }))

        dispatch(callSelectLikePosting({
            memberCode: memberCode
        }),[currentPage])




        return () => {
            document.body.classList.remove(style.companyListBody);
        };
    }, [currentPage]);

    function getPostingCity(fullAddress) {

        // 예시: "서울 광진구 천호대로124길 20"
        const addressParts = fullAddress.split(' '); // 공백을 기준으로 나눔
        const city = addressParts[0] +  " "  + addressParts[1]; // 첫 번째 부분이 서울시

        
        
        return city;
    }

    const onClickPostingHandler = (posting) => {

        const url = `/companyDetails/${posting.postingCode}`
        console.log(posting, "posting");

        navigate(url, { state: { posting } });

    }


    return (

        <>
            <div className={style.mainContainer}>
                <div>
                    <div className={style.companyList}>
                        <div className={style.title}>
                            <h1 style={{ marginLeft: '100px' }}>채용정보</h1>
                            <Link to="/companyList/companyRegist" className={style.registButton}>
                                공고 등록
                            </Link>
                        </div>
                        {postingList?.map((posting, index) => (
                            <div key={index} className={style.companyDetails} onClick={() => onClickPostingHandler(posting, index)}>
                                <div className={style.companyTitle}>
                                    <div><strong>{posting.postingTitle}</strong></div>
                                    <div>{posting.endDate}</div>

                                </div>
                                <div className={style.condition}>
                                    <div>{getPostingCity(posting.location)}</div>
                                    <div>{posting.education}</div>
                                    <div>{posting.position}</div>
                                    <div>{posting.closingForm}</div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className={style.likeConpany}>

                    <div className={style.subTitle}><strong>내가 찜한 공고와 비슷한 공고</strong></div>

                    {postingLikeList?.map((posting, index) => (

                        <div> <div className={style.companyTitle} onClick={() => onClickPostingHandler(posting,index)}>
                        <div><strong>{posting.postingTitle}</strong></div>
                        
                        </div>
                        <div className={style.condition}>
                            <div>{getPostingCity(posting.location)}</div>
                            <div>{posting.education}</div>
                            
                            <div>{posting.closingForm}</div>
                        </div></div>
                        
                    ))}
                </div>
            </div>
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }} className={style.pagingContainer}>
                            { Array.isArray(postingList) &&
                            <button 
                                onClick={() => setCurrentPage(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className={ style.pagingBtn }
                            >
                                &lt;
                            </button>
                            }
                            {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button
                                    style={ currentPage === num ? {backgroundColor : '#3498db' , color : "white"} : null}
                                    className={ style.pagingBtn }
                                >
                                    {num}
                                </button>
                            </li>
                            ))}
                            { Array.isArray(postingList) &&
                            <button 
                                className={ style.pagingBtn }
                                onClick={() => setCurrentPage(currentPage + 1)} 
                                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                            >
                                &gt;
                            </button>
                            }
                        </div>
            
        </>

    )
}


export default Apply;