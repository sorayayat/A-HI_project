import style from './Answer.module.css';
export const Answer = ({ answer }) => {
    return (
        <div className={style.answerContianer}>
           
            <div className={style.feedbackContainer}>
            <h3>면접예상질문</h3>
            {[...Array(6)].map((_, i) => (
              <div key={i}> {/* 각 항목을 div로 묶음 */}
              <p>문항 {i + 1}</p>
              <input className={style.inputAnswer} type='text' />
          </div>
            ))}
            
            <div>
            <button className={style.feedbackButton}>피드백 받기</button>
            </div>
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


