import { useState, useEffect } from "react";
import style from './Interview.module.css';
import SearchBarStyle from '../mainpage/Search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Interview = () => {

    const [question, setquestion] = useState('');

    const [answer, setAnswer] = useState('');

    const [AIanswer, setAianswer] = useState(''); 
    
    useEffect(() => {
        //서버에서 받은 에상 질문을 가져올 코드
        setquestion('');

    },[]);

 // 답변 입력 핸들러
    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

// 제출 버튼 핸들러
    const handleAskQuestion = () => {
    // 여기에 답변을 서버로 전송하는 로직을 구현
    // 예시: console.log("Submitted answer: ", answer);
    };

    const handleSearchAnnouncement = () => {
        //공고를 검색
    }
    // 화면 작업은 return 내부에 작성한다.
    return (
        <>
         {/* 첫 화면에 나타날 내용 */}
         
         <div className={style.header}><h1>AI 면접</h1></div>
         <div className={style.shoulder}><h3>AI와 함께 면접을 준비해보세요</h3></div>

        <div className={SearchBarStyle.searchWrapper}>
            <div className={SearchBarStyle.searchBar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={SearchBarStyle.faMagnifyingGlass} style={{cursor: 'pointer'}} />
                <input type="search" className={SearchBarStyle.searchBox} autocomplete='off' placeholder="채용 공고 링크를 입력하세요">
                </input> 
            </div>
        </div>
                   
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100px', background: 'white', borderRadius: '70px' }}>
                <button className={style.blueButton} onClick={handleSearchAnnouncement}>AI 면접 시작하기</button>
            </div>
    

                {/* 링크가 입력되어서 값이 들어오면 나타나게 한다.
        <div>            
                <label htmlFor="questionInput">면접예상 질문:</label>
                <p>{question}</p>
            </div>
            <div>
                <label htmlFor="aswerInput">답변:</label>
                <input
                    type="text"
                    id="aswerInput"
                    value={answer}
                    onChange={handleAnswerChange}
                />
                <button onClick={handleAskQuestion}>제출</button>
                <p>{answer}</p>

            </div> */}

    
        </>
    )
}

export default Interview;
