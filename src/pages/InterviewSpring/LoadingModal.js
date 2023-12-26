import React, { useState,useEffect } from 'react';
import style from './LoadingModal.module.css'; // CSS 스타일 임포트
import loadingImage1 from './loading1.jpg'; // 이미지 임포트
import loadingImage2 from './loading2.jpg';
import loadingImage3 from './loading3.jpg';


const loadingData = [
    { image: loadingImage1, text: '잠시만 기다려주세요... 질문생성중' },
    { image: loadingImage2, text: '두뇌 풀가동 좋은 질문을 고르고 있어요 ' },
    { image: loadingImage3, text: '제발 떠나지 말아주세요 ㅠㅠ' },
];
const LoadingModal = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // 1.5초마다 이미지를 바꾸는 로직
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % loadingData.length // 다음 이미지 인덱스로 순환
            );
        }, 1500);

        // 컴포넌트가 언마운트될 때 인터벌을 제거
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContent}>
                <img src={loadingData[currentImageIndex].image} alt="로딩 중" /><br/>
                <h3>{loadingData[currentImageIndex].text}</h3>
            </div>
            
        </div>
    );
};


export default LoadingModal;
