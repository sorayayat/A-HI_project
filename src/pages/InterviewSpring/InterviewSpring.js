import { useState, useEffect } from "react";
import style from './InterviewSpring.module.css';
import SearchBarStyle from '../mainpage/Search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Answer, Feedback } from './Answer';
import LoadingModal from "./LoadingModal";
const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;
const InterviewSpring = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [answer, setAnswer] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSendPrompt = () => {
        let timer = setTimeout(() => {
            setIsLoading(true);
        }, 1000);

        axios.get(`http://${serverIp}:${serverPort}/interview/gpt?queryString=${searchQuery}`)
            .then(response => {
                const responseData = response.data;
                if (response.data.result === 'success') {
                    setData(responseData);
                } else {
                    setIsLoading(false);
                    alert('전개시 공고만 넣어주세요');
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
            .finally(() => {
                clearTimeout(timer); // 타이머 취소
                setIsLoading(false);
            });
    };

    const setData = (data) => {
        setAnswer({
            question1: data.question1,
            question2: data.question2 || '',
            question3: data.question3 || '',
            question4: data.question4 || '',
            question5: data.question5 || '',
            question6: data.question6 || '',
        });
    }

    return (
        <>
            <div className={style.header}><h1>AI 면접</h1></div>
            <div className={style.shoulder}><h3>AI와 함께 면접을 준비해보세요</h3></div>
            <div className={SearchBarStyle.searchWrapper}>
                <div className={SearchBarStyle.searchBar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={SearchBarStyle.faMagnifyingGlass} style={{ cursor: 'pointer' }} />
                    <input type="search" className={SearchBarStyle.searchBox} autoComplete='off' placeholder="채용 공고 링크를 입력하세요"
                        value={searchQuery} onChange={handleChange}>
                    </input>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100px', background: 'white', borderRadius: '70px' }}>
                <button className={style.blueButton} onClick={handleSendPrompt}>AI 면접 시작하기</button>
            </div>
            <div className={style.answerContainer}>
                {answer && <Answer answer={answer} />}
            </div>
            {isLoading && <LoadingModal />} 
        </>
    )
}

export default InterviewSpring;
