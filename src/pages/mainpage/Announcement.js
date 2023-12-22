import React, { useState, useEffect  } from 'react';
import styles from './Announcement.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';



const Announcement = () => {

    // 캐러셀 함수
    const [startIndex, setStartIndex] = useState(0);
    const numToShow = 4; // 한 번에 보여줄 공고 수

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

   


    return (
        <>
            <div className={styles.AnmCarouselContainer}>
                <div className={styles.anmTopMargin}/>
                    <aside className={styles.anmTitle}>
                        <div><h1>채용공고</h1></div>
                        <div className={styles.anmNav}>
                            <Link to="/companyList" className={styles.seeAllAnm}>
                                전체공고
                            </Link>
                            <button className={styles.beforeBtn} onClick={prevAnnouncements} disabled={startIndex === 0}><FaChevronLeft style={{ color: 'gray' }}/></button>
                            <button className={styles.afterBtn} onClick={nextAnnouncements} disabled={startIndex + numToShow >= 12}><FaChevronRight style={{ color: 'gray' }}/></button>
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
                            {/* 공고 1 */}
                            <div data-index="0" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/0">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>{truncateText('DMS 개발 및 운영 담당', 16)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 2 */}
                            <div data-index="1" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/1">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>{truncateText('엔씨소프트 부문별 수시 채용', 16)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 3 */}
                            <div data-index="2" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/2">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>웹(JAVA/JSP)개발/시스템 운영</p>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 4 */}
                            <div data-index="3" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/3">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>클라우드 엡 애플리케이션 개발자</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 5 */}
                            <div data-index="4" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/3">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>파이썬 개발자</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 6 */}
                            <div data-index="5" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/4">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>파이썬 개발자</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 7 */}
                            <div data-index="6" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/5">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>파이썬 개발자</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 8 */}
                            <div data-index="7" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/6">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>{truncateText('윈도우 어플리케이션 개발 및 유지보수',16)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 9 */}
                            <div data-index="8" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/7">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>React 풀스택 개발</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 10 */}
                            <div data-index="9" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/8">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>자연어처리(멀티모달) 엔지니어</p>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 11 */}
                            <div data-index="10" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/9">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>DBA 채용</p>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 12 */}
                            <div data-index="11" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <Link to="/announcement/10">
                                            <div className={styles.jobThumbnail}></div>
                                            <div>
                                                <p>Senior FrontEnd Engineer</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Announcement;