import style from './CompanyList.module.css'
import { useEffect } from 'react';

function Apply(){

    useEffect(() => {
        document.body.classList.add(style.companyListBody);

        return () => {
            document.body.classList.remove(style.companyListBody);
        };
    }, []);

    return (

        <>
            <div className={style.mainContainer}>
                <div>
                    <div className={style.companyList}>
                        <h1 style={{ marginLeft: '100px'}}>채용정보</h1>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>
                        <div className={style.companyDetails}>
                            <div className={style.companyTitle}>
                                <div><strong>유비온 프론트엔드 개발/퍼블리셔 담당자 모집 </strong></div>
                                <div>상시채용</div>
                            </div>
                            <div className={style.condition}>
                                <div>서울 구로구</div>
                                <div>경력</div>
                                <div>학력무관</div>
                                <div>프리랜서</div>
                            </div>
                        </div>

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