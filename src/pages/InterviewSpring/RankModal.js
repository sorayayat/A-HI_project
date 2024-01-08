import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './RankModal.module.css';

const RankModal = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const rankInfo = async () => {
            try {
                const response = await axios.get('/api/rank/post');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        rankInfo();
    }, []);

    const nextItem = () => {
        setCurrentIndex(prevIndex => (prevIndex + 2 < data.length) ? prevIndex + 2 : 0);
    };
    
    const prevItem = () => {
        setCurrentIndex(prevIndex => (prevIndex - 2 >= 0) ? prevIndex - 2 : data.length - (data.length % 2));
    };
    

    return (
        <div className={style.modalBackdrop}>
        <div className={style.rankModal}>
            {data.length > 0 && (
                <div className={style.carousel}>
                <button onClick={prevItem}>이전</button>
                <div>
                    {data.slice(currentIndex, currentIndex + 2).map((item, index) => (
                        <div key={index} className={style.carouselItem}>
                           
                            {item.posting.logoEntity && (
                                <img 
                                    src={`${item.posting.logoEntity.path}/${item.posting.logoEntity.serverName}`} 
                                    alt="Company Logo" 
                                />
                            )}
                            <h3>{item.posting.postingTitle}</h3>
                            <p>Likes: {item.likesCount}</p>
                        </div>
                    ))}
                </div>
                <button onClick={nextItem}>다음</button>
            </div>
            
            )}
        </div>
        </div>
    );
};

export default RankModal;
