import style from './CompanyDetails.module.css';
import { useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

function CompanyDetails() {
    
    useEffect(() => {
        document.body.classList.add(style.companyDetailsBody);

        return () => {
            document.body.classList.remove(style.companyDetailsBody);
        };
    }, []);

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

                <div  className={style.companyInfoContainer}>
                    <div>
                        <div className={style.titleText1}>
                            <p>제목들어갈곳</p>
                        </div>
                    </div>
                    <div className={style.companyInfo}>
                        <div className={style.titleText2}>
                            <p>지원 자격</p>
                        </div>
                        <div className={style.titleText3}>
                            <p>근무 조건</p>
                        </div>
                    </div>
                </div>

                <button className={style.sendButton}>☆ 스크랩</button>

                <div id="details" className={style.detailsContainer}>
                    <div className={style.details}><p>상세정보</p></div>
                </div>

                <div id="companyInfo" className={style.companyProfileContainer}>
                    <div className={style.companyInfomation}><p>기업 정보</p></div>
                </div>
            </div>
        </>
    );
}

export default CompanyDetails;
