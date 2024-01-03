import style from './CompanyList.module.css'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callSelectJobListing } from '../../apis/postingAPICalls'
import { useDispatch, useSelector } from 'react-redux';
import { callSelectLikePosting } from '../../apis/recommendationAPICalls';

function Apply() {

    const dispatch = useDispatch();
    const posting = useSelector(state => state.companyReducer.getJoblist);
    const postingList = posting?.data;
    const navigate = useNavigate();
    const postingLikeList = useSelector(state => state.recommendationReducer.postingLike);

    console.log(postingLikeList , ">?");
    
    
    
    

    const sortByPostingCode = (a, b) => b.postingCode - a.postingCode;


    useEffect(() => {
        document.body.classList.add(style.companyListBody);
        window.scrollTo(0, 0);

        dispatch(callSelectJobListing({

        }))

        dispatch(callSelectLikePosting({
            memberCode: 3
        }))




        return () => {
            document.body.classList.remove(style.companyListBody);
        };
    }, []);

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
                        {postingList?.sort(sortByPostingCode).map((posting, index) => (
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
        </>

    )
}


export default Apply;