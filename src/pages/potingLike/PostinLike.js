import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './postingLike.module.css';




const PostingLike = () => {
const [imagePath, setImagePath] = useState(null);
const [postings, setPostings] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const userInfoString=sessionStorage.getItem('userInfo'); 
let userInfo = JSON.parse(userInfoString);
const loadPostings = () => {
    axios.get(`/api/in/member/myPage?memberId=`+userInfo.id)
        .then(response => {
            const postingsData = response.data.map(item => {
                const posting = JSON.parse(item);
                // company 객체가 없는 경우에 대비한 기본값 설정
                if (!posting.company) {
                    posting.company = { logoEntity: null };
                }
                return posting;
            });
            setPostings(postingsData);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
};

useEffect(() => {
    loadPostings();
    setImagePath("/src/pages/mypage/loading2.jpg");
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
                <button  className={styles.btn} onClick={prevItems}>이전</button>
                {postings.slice(currentIndex, currentIndex + 4).map((posting, index) => (
<div key={index} className={styles.postingItem}>
{posting.company?.logoEntity && (
  <img 
  src={`http://localhost:8001/logoimg/${posting.company.logoEntity.serverName}`} 
  alt={posting.company.logoEntity.originalName} 
/>

)}
<p className={styles.postingDetail}><strong>공고 제목:</strong>{posting.postingTitle}</p>
<p className={styles.postingDetail}><strong>근무 지역:</strong>{posting.location}</p>
</div>
))}


                <button className={styles.btn} onClick={nextItems}>다음</button>
            </div>
        </div>
    </>
);
};

export default PostingLike;
