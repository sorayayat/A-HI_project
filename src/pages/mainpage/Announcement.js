import React, { useState, useEffect } from 'react';
import styles from './Announcement.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetCompanyLogo } from '../../apis/postingAPICalls';
import { LoadingSpiner } from '../../other/LoadingSpiner';


const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;

const Announcement = () => {

    const dispatch = useDispatch();

    // 캐러셀 함수
    const [startIndex, setStartIndex] = useState(0);
    const numToShow = 4; // 한 번에 보여줄 공고 수

    const posting = useSelector(state => state?.companyReducer?.getCompanyLogo);

    console.log(posting?.data, "성공");

    const postingList = posting?.data?.slice(0, 16);

    const navigate = useNavigate();

    useEffect(() => {


        dispatch(callGetCompanyLogo({

        }))

    },[]);





    const nextAnnouncements = () => {
        if (startIndex + numToShow < 12) {
            setStartIndex(startIndex + numToShow);
        }
    };

    const prevAnnouncements = () => {
        if (startIndex - numToShow >= 0) {
            setStartIndex(startIndex - numToShow);
        }
    };


    // 글자수 넘어가면 ...으로 표시
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const onClickPostingHandler = (posting) => {

        const url = `/companyDetails/${posting.postingCode}`
        console.log(posting, "posting");

        navigate(url, { state: { posting } });

    }

    





    return (
        <>
            <div className={styles.AnmCarouselContainer}>
                <div className={styles.anmTopMargin} />
                <aside className={styles.anmTitle}>
                    <div><h1>채용공고</h1></div>
                    <div className={styles.anmNav}>
                        <Link to="/companyList" className={styles.seeAllAnm}>
                            전체공고
                        </Link>
                        <button className={styles.beforeBtn} onClick={prevAnnouncements} disabled={startIndex === 0}><FaChevronLeft style={{ color: 'gray' }} /></button>
                        <button className={styles.afterBtn} onClick={nextAnnouncements} disabled={startIndex + numToShow >= 12}><FaChevronRight style={{ color: 'gray' }} /></button>
                    </div>
                </aside>
                {/* 채용 공고 리스트(데이터 인덱스로 보여주기) */}
                <div className={styles.anmContents}>
                    <div className={styles.anmList}>
                        <div className={styles.anmTrack}
                            style={{
                                transform: `translateX(${-270 * startIndex}px)`,
                                transition: 'transform 0.5s ease'
                            }}
                        >
                            {postingList?.map((posting, index) => (
                                <div key={index} className={styles.slick}>
                                    <div className={styles.jobContainer} onClick={() => onClickPostingHandler(posting, index)}>
                                        <div data-cy="jobCard">
                                            
                                                <img  src={`http://${serverIp}:${serverPort}/logoimg/${posting.company.logoEntity.serverName}`} alt="공고이미지없음" className={styles.jobThumbnail} style={{width:"100%", paddingBottom:"0px", height: "160px"}}></img>
                                                <div style={{paddingLeft: "10px"}}>
                                                    <p>{truncateText(posting.postingTitle, 16)}</p>
                                                </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}

                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Announcement;