import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from './Interview.module.css';
import SearchBarStyle from '../mainpage/Search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { callInterview } from '../../apis/interviewAPICalls'
import axios, { AxiosInstance } from 'axios';

// 수정 사항 aaaaa
// 폰트 수정하기 

const Interview = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [question, setquestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [AIanswer, setAianswer] = useState(''); 
    const dispatch = useDispatch();
      
    const handleSearchAnnouncement = () => {

        dispatch(callInterview({

            searchQuery : searchQuery

        }))
    }

    const handleSendAnswer = async () => {

        dispatch(callInterview({

            answer : answer
            
        }))
    };

    // 화면 작업은 return 내부에 작성한다.
    return (
        <>
         {/* 첫 화면에 나타날 내용 */}
        
         <div className={style.header}><h1>aaaAI 면접</h1></div>
         <div className={style.shoulder}><h3>AI와 함께 면접을 준비해보세요</h3></div>

        <div className={SearchBarStyle.searchWrapper}>
            <div className={SearchBarStyle.searchBar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={SearchBarStyle.faMagnifyingGlass} style={{cursor: 'pointer'}} />
                <input type="search" className={SearchBarStyle.searchBox} autoComplete='off' placeholder="채용 공고 링크를 입력하세요"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
                </input> 
            </div>
        </div>
                   
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100px', background: 'white', borderRadius: '70px' }}>
            <button className={style.blueButton} onClick={handleSearchAnnouncement}>AI 면접 시작하기</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100px' }}>
            <div className={style.question_box}>
                <p>{question}</p>
            </div>
        </div>
        
        <div className={style.answer_box}>
            <input type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                autoComplete='off' placeholder="여기에 답변을 입력해주세요."></input>
            <button onClick={handleSendAnswer}>답변 하기</button>
        </div>

        <div>
            {AIanswer && <p>AI 피드백: {AIanswer}</p>}
        </div>
    
        </>
    )
}

export default Interview;
