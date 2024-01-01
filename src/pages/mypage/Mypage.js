import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './mypage.module.css';

const Mypage = () => {
    const [postings, setPostings] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const userInfoString=sessionStorage.getItem('userInfo'); 
    let userInfo = JSON.parse(userInfoString);
    const loadPostings = () => {
        axios.get(`/api/in/member/myPage?memberId=`+userInfo.id)
            .then(response => {
              console.log(response.data);
                const postingsData = response.data.map(item => JSON.parse(item));
                setPostings(postingsData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    };

    useEffect(() => {
        loadPostings();
    }, []);

    const nextItems = () => {
        setCurrentIndex(currentIndex + 4 < postings.length ? currentIndex + 4 : 0);
    };

    const prevItems = () => {
        setCurrentIndex(currentIndex - 4 >= 0 ? currentIndex - 4 : postings.length - 4);
    };

    return (
        <>
            <div className={styles.container}>
                <h3>찜한 공고</h3>
                <div className={styles.myContainer}>
                    <button onClick={prevItems}>이전</button>
                    {postings.slice(currentIndex, currentIndex + 4).map((posting, index) => (
    <div key={index} className={styles.postingItem}>
       <img src="/images/jingjing.png" alt="Example" />
        <p className={styles.postingDetail}><strong>공고 제목:</strong>{posting.postingTitle}</p>
        <p className={styles.postingDetail}><strong>근무 지역:</strong>{posting.location}</p>
    </div>
))}

                    <button onClick={nextItems}>다음</button>
                </div>
            </div>
        </>
    );
};

export default Mypage;
