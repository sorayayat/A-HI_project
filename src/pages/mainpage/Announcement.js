import React, { useState } from 'react';
import styles from './Announcement.module.css';



const Announcement = () => {

    const [startIndex, setStartIndex] = useState(0);
    const numToShow = 4; // 한 번에 보여줄 공고 수

    const nextAnnouncements = () => {
        if (startIndex + numToShow < totalAnnouncements) {
            setStartIndex(startIndex + numToShow);
        }
    };

    const prevAnnouncements = () => {
        if (startIndex - numToShow >= 0) {
            setStartIndex(startIndex - numToShow);
        }
    };

    // 전체 공고 데이터
    const announcements = [
        { id: 0, title: "DMS 개발 및 운영 담당" },
        { id: 1, title: "엔씨소프트 부문별 수시 채용" },
        { id: 2, title: "웹(JAVA/JSP)개발/시스템 운영" },
        { id: 3, title: "클라우드 엡 애플리케이션 개발자" },
        { id: 4, title: "파이썬 개발자" },
        { id: 5, title: "파이썬 개발자" },
        { id: 6, title: "파이썬 개발자" },
        { id: 7, title: "파이썬 개발자" },
        { id: 8, title: "파이썬 개발자" },
    ];

    const totalAnnouncements = announcements.length;


    return (
        <>
            <div className={styles.AnmCarouselContainer}>
                <div className={styles.anmTopMargin}/>
                    <aside className={styles.anmTitle}>
                        <div><h1>채용공고</h1></div>
                        <div className={styles.anmNav}>
                            <a href="/announcement" className={styles.seeAllAnm}>
                                전체공고
                            </a>
                            <button className={styles.beforeBtn} onClick={prevAnnouncements}>이전</button>
                            <button className={styles.afterBtn} onClick={nextAnnouncements}>다음</button>
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
                                        <a href="/announcement/0">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>DMS 개발 및 운영 담당</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 2 */}
                            <div data-index="1" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <a href="/announcement/1">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>엔씨소프트 부문별 수시 채용</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 3 */}
                            <div data-index="2" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <a href="/announcement/2">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>웹(JAVA/JSP)개발/시스템 운영</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 4 */}
                            <div data-index="3" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <a href="/announcement/3">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>클라우드 엡 애플리케이션 개발자</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 5 */}
                            <div data-index="4" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <a href="/announcement/3">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>파이썬 개발자</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 5 */}
                            <div data-index="5" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <a href="/announcement/3">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>파이썬 개발자</p>
                                        </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* 공고 5 */}
                            <div data-index="6" className={styles.slick}>
                                <div className={styles.jobContainer}>
                                    <div data-cy="jobCard">
                                        <a href="/announcement/3">
                                        <div className={styles.jobThumbnail}></div>
                                        <div>
                                            <p>파이썬 개발자</p>
                                        </div>
                                        </a>
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