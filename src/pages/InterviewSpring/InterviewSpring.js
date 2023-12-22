import { useState, useEffect } from "react";
import style from './InterviewSpring.module.css';
import SearchBarStyle from '../mainpage/Search.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Answer,Feedback} from './Answer';


const InterviewSpring = () => {
    const [answer,setAnswer] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

const handleSendPrompt= () =>{
    axios.get(`./interview/gpt?prompt=${searchQuery}`)
    .then(response => {
        setAnswer(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    })
    .finally(() => {
    });


};


    return (
        <>
      
        
         <div className={style.header}><h1>AI 면접</h1></div>
         <div className={style.shoulder}><h3>AI와 함께 면접을 준비해보세요</h3></div>

        <div className={SearchBarStyle.searchWrapper}>
            <div className={SearchBarStyle.searchBar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={SearchBarStyle.faMagnifyingGlass} style={{cursor: 'pointer'}} />
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
    
        </>
    )
}

export default InterviewSpring;
