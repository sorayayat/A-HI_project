import style from './Answer.module.css';
import { useState,useEffect } from "react";
import axios from 'axios';
import RankModal from './RankModal'; 
const serverIp = process.env.REACT_APP_SPRING_APP_SERVER_IP;
const serverPort = process.env.REACT_APP_SPRING_APP_SERVER_PORT;
export const Answer = ({ answer }) => {
    const [showRankModal, setShowRankModal] = useState(false);
    const [showFeedback, setShowFeedback] = useState(Array(6).fill(false));
    const [textAreaValues, setTextAreaValues] = useState(Array(6).fill(""));
    const [feedbacks, setFeedbacks] = useState(Array(6).fill(null)); 
    const [charCounts, setCharCounts] = useState(Array(6).fill(0));
    const toggleFeedback = (index) => {
        const newShowFeedback = [...showFeedback];
        newShowFeedback[index] = !newShowFeedback[index];
        setShowFeedback(newShowFeedback);
    };
    useEffect(() => {
        setTextAreaValues(Array(6).fill(""));
        setFeedbacks(Array(6).fill(null));
        setShowFeedback(Array(6).fill(false));
    }, [answer]);
    const handleTextareaChange = (index, value) => {
        const newTextValues = [...textAreaValues];
        newTextValues[index] = value;
        setTextAreaValues(newTextValues);

        const newCharCounts = [...charCounts];
        newCharCounts[index] = value.length;
        setCharCounts(newCharCounts);



    };
    const handleSubmit = (index) => {
        const questionKey = `question${index + 1}`;
        const questionText = answer[questionKey];
        const responseText = textAreaValues[index];
        setShowRankModal(true);
        axios.post(`http://${serverIp}:${serverPort}/interview/person/answer`, {
            question1: questionText,
            result: responseText,
            question2: index + 1,
        }).then(response => {
            setShowRankModal(false);
            console.log("Server response:", response.data);
        
            const serverResponse = response.data;
            setFeedbacks(prevFeedbacks => {
                const newFeedbacks = [...prevFeedbacks];
                newFeedbacks[index] = {
                    goodjob: serverResponse.goodjob.replace(/^"|"$/g, ''),
                    improve: serverResponse.improve.replace(/^"|"$/g, ''),
                    perfect: serverResponse.perfect.replace(/^"|"$/g, '')
                };
                return newFeedbacks;
            });
        
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            setShowRankModal(false);
        });
    };
    return (
        <div className={style.feedbackContainer}>
        <div className={style.answerContainer}>
        <div className={style.feedbackContainer}>
            {[...Array(6)].map((_, i) => {
                const questionKey = `question${i + 1}`;
                const questionText = answer[questionKey];
                const textAreaId = `personAnswer${i+1}`;
                const questionButton = `questionBtn${i+1}`;  
                const personSubmit =`person${i+1}`;  

                const textAreaClass = showFeedback[i] ? style.inputAnswer : `${style.inputAnswer} hidden`;


                return questionText && (
                    <div key={i}>
                        <button onClick={() => toggleFeedback(i)} className={style.feedbackButton} id={questionButton}>
                            {questionText}
                        </button>
                       
                        {showFeedback[i] && (
                            <div>
                                <div className={style.textAreaContainer}>
                                <textarea className={textAreaClass} rows="4" cols="50" id={textAreaId}
                              value={textAreaValues[i]} // value를 textAreaValues 상태와 바인딩
                              onChange={(e) => handleTextareaChange(i, e.target.value)}
                              maxLength="1500" placeholder='최대 1500자까지 입력 가능합니다.'
                    ></textarea>
                                    <div className={style.charCount} style={{ color: 'lightgray', fontSize: 'small' }}>
                                        {charCounts[i]}/1500 글자
                                    </div>
                                </div>
                               
                                {feedbacks[i] && (
    <div>
        <div className={style.feedbackSection}>
            <p className={style.feedbackTitle}>잘한점:</p>
            <p className={style.feedbackContent}>{feedbacks[i].goodjob}</p>
        </div>
        <div className={style.feedbackSection}>
            <p className={style.feedbackTitle}>개선할점:</p>
            <p className={style.feedbackContent}>{feedbacks[i].improve}</p>
        </div>
        <div className={style.feedbackSection}>
            <p className={style.feedbackTitle}>좋은답변 예시:</p>
            <p className={style.feedbackContent}>{feedbacks[i].perfect}</p>
        </div>
    </div>
)}

                                
                                 <div className={style.submitButtonContainer}>
                                <button className={style.submitButton} id={personSubmit}
                                    onClick={() => handleSubmit(i)}
                                >제출하기</button>
                            </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
        {showRankModal && <RankModal  />}
</div>
    </div>
    );
};


export const Feedback = () => {
    return(
<>


</>

    );

}


