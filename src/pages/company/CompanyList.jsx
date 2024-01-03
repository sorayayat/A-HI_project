import style from './CompanyList.module.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callSelectJobListing } from '../../apis/postingAPICalls'
import { useDispatch, useSelector } from 'react-redux';

function Apply() {

    const dispatch = useDispatch();
    const posting = useSelector(state => state.companyReducer);
    const postingList = posting.data;

    console.log(postingList, "gdgd");


    useEffect(() => {
        document.body.classList.add(style.companyListBody);
        window.scrollTo(0, 0);

        dispatch(callSelectJobListing({
            companyCode: 1
        }))

        return () => {
            document.body.classList.remove(style.companyListBody);
        };
    }, []);




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
                        {postingList.postingList.map((posting, index) => (
                            <div key={index} className={style.companyDetails}>
                                <div className={style.companyTitle}>
                                    <div><strong>{posting.postingTitle}</strong></div>
                                    <div>{posting.endDate}</div>
                                    
                                </div>
                                <div className={style.condition}>
                                    <div>{posting.location}</div>
                                    <div>{posting.education}</div>
                                    <div>{posting.closingForm}</div>
                                    
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className={style.likeConpany}>

                    <div className={style.subTitle}><strong>내가 찜한 공고와 비슷한 공고</strong></div>
                    <div> <div className={style.companyTitle}>
                        <div><strong>웹/앱 sw 개발자 </strong></div>
                        <div>채용시</div>
                    </div>
                        <div className={style.condition}>
                            <div>서울 서초구</div>
                            <div>경력무관</div>
                            <div>대졸</div>
                            <div>정규직</div>
                        </div></div>

                </div>
            </div>
        </>

    )
}


export default Apply;