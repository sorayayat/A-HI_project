import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import interviewstyle from './Interview.module.css';
import styles from '../recommendation/Recommendation.module.css'
import { callInterview } from '../../apis/interviewAPICalls'
import { callInterviewAnswer } from '../../apis/interviewAPIanswerCall'
import { calluserInterview } from '../../apis/userinterviewCall'
import Swal from "sweetalert2";
import LoadingScreen from "./LoadingScreen";

const UserInterview = () => {
    // 이력서 pdf formdata
    const [userPDF, setuserPDF] = useState(false);
    // gpt에게 들어온 질문 json 타입
    const [question, setquestion] = useState('');
    // 사용자 답변 json 타입 
    const [userAnswer, setuserAnswer] = useState('');
    // gpt 답변 json 타입
    const [AIanswer, setAIanswer] = useState('');
    // 상태 값에 따라 로딩바 동작
    const [isLoading, setIsLoading] = useState(false);
    // 샹태 값에 따라 토글 동작
    const [isToggled, setIsToggled] = useState({});
    const dispatch = useDispatch();
    const [dragging, setDragging] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState();


    const handleDrop = (e) => {
        const files = Array.from(e.dataTransfer.files)
        setuserPDF(files);

        console.log('userfile', e.dataTransfer.files);

        const fileNames = files.map(file => file.name);
        console.log('드롭한 파일:', fileNames);

        setDroppedFiles(fileNames); // 이전 파일 목록에 새 파일 추가

    };

    const onClickuserfileHandler = () => {
        if (userPDF === undefined) {
            Swal.fire({
                icon: 'info',
                test: 'add file',
            })
        } else {
            const formData = new FormData();

            console.log("test", userPDF[0]);

            formData.append("file", userPDF[0])

            dispatch(calluserInterview({
                userPDF : formData
            }))

            setIsLoading(true)
        }
    }
    
    const handleSendAnswer = async () => {
        setIsLoading(true); // 로딩 시작
        dispatch(callInterviewAnswer({ userAnswer: userAnswer }, (sandresult) => {
            setAIanswer(sandresult.AIanswer);
            setIsLoading(false); // 로딩 종료
        })).catch(() => {
            setIsLoading(false); // 오류 발생 시 로딩 종료
        });
    };


    const handleAnswerChange = (index, value) => {
        setuserAnswer(prev => ({ ...prev, [index]: value }));
    };

    const handleToggle = (index) => {
        setIsToggled(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    const questions = question.split('\n').filter(q => q.trim() !== '');



    // 화면 작업은 return 내부에 작성한다.
    return (
        <>
            {/* 첫 화면에 나타날 내용 */}
        <div className={interviewstyle.container}>
            <div className={interviewstyle.header}><h1>AI 면접</h1>
                <div className={interviewstyle.shoulder}><h3>AI와 함께 면접을 준비해보세요</h3></div>
            </div>
            {/* 로딩화면을 나타낸다 */}
            <LoadingScreen isLoading={isLoading} />

                <div className={styles.uploadBox} onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    style={{
                        border: '2px dashed #ccc',
                        textAlign: 'center',
                        backgroundColor: dragging ? 'gray' : 'white',
                    }}>
                    <p>{dragging ? '' : '여기로 파일을 드래그하세요'}</p>

                    {droppedFiles && (
                        <div >
                            {droppedFiles.map((fileName, index) => (
                                <p key={index}>{fileName}</p>
                                ))}

                        </div>
                    )}
                </div>
                <button className={styles.recommendationButton} onClick={onClickuserfileHandler}>AI 면접시작하기</button>
        </div>

    
            {/* 질문창과 답변 창을 중앙으로 정렬 */}
            <div className={interviewstyle.questionBoxWrapper}>
                

                {questions.map((q, index) => (
                    <div className={interviewstyle.questionBox}>
                        <p>{q}</p>
                        {/* 토글 버튼 */}
                        <button onClick={() => handleToggle(index)} className={interviewstyle.toggle}>
                            {isToggled[index] ? '▲' : '▼'}
                        </button>

                        {/* 토글된 상태에 따라 답변란 표시 */}
                        {isToggled[index] && (
                            <div className={interviewstyle.answerBoxs}>
                                <input type="text"
                                    value={userAnswer[index] || ''}
                                    onChange={(e) => handleAnswerChange(index, e.target.value,)}
                                    autoComplete='off' placeholder="여기에 답변을 입력해주세요."></input>
                                <button className={interviewstyle.actionButton} onClick={handleSendAnswer}>답변 하기</button>
                                {AIanswer && (
                                    <div className={interviewstyle.questionBox}>
                                        {AIanswer && <p>AI 피드백: {AIanswer}</p>}
                                    </div>)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </>
    )
}

export default UserInterview;
