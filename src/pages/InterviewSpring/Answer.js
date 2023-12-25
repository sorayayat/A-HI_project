import style from './Answer.module.css';
import { useState } from "react";
import axios from 'axios';
export const Answer = ({ answer }) => {
    const [showFeedback, setShowFeedback] = useState(Array(6).fill(false));
    const [textAreaValues, setTextAreaValues] = useState(Array(6).fill(""));
    const [feedbacks, setFeedbacks] = useState(Array(6).fill(null)); // 각 질문에 대한 피드백을 저장할 배열

    const toggleFeedback = (index) => {
        const newShowFeedback = [...showFeedback];
        newShowFeedback[index] = !newShowFeedback[index];
        setShowFeedback(newShowFeedback);
    };

    const handleTextareaChange = (index, value) => {
        const newTextValues = [...textAreaValues];
        newTextValues[index] = value;
        setTextAreaValues(newTextValues);
    };
    const handleSubmit = (index) => {
        const questionKey = `question${index + 1}`;
        const questionText = answer[questionKey];
        const responseText = textAreaValues[index];

        // Axios로 서버에 데이터 전송
        axios.post('/interview/person/answer', {
            question1: questionText,
            result: responseText,
            question2:index+1,
        }).then(response => {
           
            console.log(response.data);
        
            const serverResponse = response.data;
    
    setFeedbacks(prevFeedbacks => {
        const newFeedbacks = [...prevFeedbacks];
        newFeedbacks[index] = serverResponse;
        return newFeedbacks;
    });
        
        
        }).catch(error => {
            // 에러 처리
            console.error(error);
        });
    };
    return (
        <div className={style.answerContainer}>
        <div className={style.feedbackContainer}>
            <h3>면접예상질문</h3>
            {[...Array(6)].map((_, i) => {
                const questionKey = `question${i + 1}`;
                const questionText = answer[questionKey];
                const textAreaId = `personAnswer${i+1}`;
                const questionButton = `questionBtn${i+1}`;  
                const personSubmit =`person${i+1}`;  
                return questionText && (
                    <div key={i}>
                        <button onClick={() => toggleFeedback(i)} className={style.feedbackButton} id={questionButton}>
                            {questionText}
                        </button>
                        {showFeedback[i] && (
                            <div className={style.textAreaContainer}>
                                <textarea className={style.inputAnswer} rows="4" cols="50" id={textAreaId}
                                onChange={(e) => handleTextareaChange(i, e.target.value)}
                                ></textarea>
                                <div className={style.submitButtonContainer}>
                                    <button className={style.submitButton} id={personSubmit}
                                     onClick={() => handleSubmit(i)}
                                    >제출하기</button>
                                    {feedbacks[i] && (
    <div>
        <p>{feedbacks[i].goodjob}</p>
        <p>{feedbacks[i].improve}</p>
    </div>
)}
                                </div>
                                
                            </div>
                        )}
                    </div>
                );
            })}
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


