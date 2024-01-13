import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import interviewstyle from './Interview.module.css';
import styles from '../recommendation/Recommendation.module.css'
import { callInterviewAnswer } from '../../apis/interviewAPIanswerCall'
import { calluserInterview } from '../../apis/userinterviewCall'
import Swal from "sweetalert2";
import LoadingScreen from "./LoadingScreen";

const UserInterview = () => {
    // 이력서 pdf formdata
    const [file, setfile] = useState();
    // gpt에게 들어온 질문 json 타입
    const [question, setquestion] = useState('');
    // 사용자 답변
    const [userAnswer, setuserAnswer] = useState([]);
    // gpt 답변 json 타입
    const [AIanswer, setAIanswer] = useState([]);
    // 상태 값에 따라 로딩바 동작
    const [isLoading, setIsLoading] = useState(false);
    // 토글 상태 관리
    const [isToggled, setIsToggled] = useState({});
    const [dragging, setDragging] = useState();
    const [droppedFiles, setDroppedFiles] = useState();
    const dispatch = useDispatch();



    const handleDrop = (e) => {

        e.preventDefault();
        setDragging(true);

        const files = Array.from(e.dataTransfer.files)

        const nonPdfFiles = files.filter(file => file.type !== 'application/pdf');

        if (nonPdfFiles.length > 0) {
            // PDF가 아닌 파일에 대한 경고창 표시
            Swal.fire({
                icon: 'error',
                title: '잘못된 파일 형식',
                text: 'PDF 파일만 드래그해 주세요.',
            });

            setDragging(false);
            return;
        }

        setfile(files);

        console.log('asd', e.dataTransfer.files);

        const fileNames = files.map(file => file.name);
        console.log('드롭한 파일:', fileNames);

        setDroppedFiles(fileNames);

    };

    const handleQuestion = async () => {
        if (!file) {
            Swal.fire({
                icon: 'error',
                text: '파일을 먼저 업로드해주세요.',
            });
            return;
        }

        try {
            const formData = new FormData();

            console.log("gd", file[0]);

            formData.append("file", file[0]);
            setIsLoading(true); 
            dispatch(calluserInterview({ file: formData }, (data, error) => {
                if (error) {
                    console.error("오류 발생:", error);
                    Swal.fire({
                        icon: 'error',
                        text: '오류가 발생했습니다. 다시 시도해주세요.',
                    });
                } else {
                    setquestion(data.question);
                }
                setIsLoading(false);
            }));

        } catch (error) {
            console.error("오류 발생:", error);
            Swal.fire({
                icon: 'error',
                text: '오류가 발생했습니다. 다시 시도해주세요.',
            });
        }

    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleToggle = (index) => {
        setIsToggled(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    
    //       ========= test 데이터 ========
//     const teststr = `1. 경희대학교 필드하키팀 감독으로서의 경험이 웹/앱 개발 분야에서 어떻게 활용될 수 있을까요?
// 2. 자신이 가장 성공적으로 수행했다고 생각하는 프로젝트는 무엇이며, 그 이유는 무엇인가요?
// 3. '서번트 리더십'을 가지고 있다고 하셨는데, 이를 구체적인 예시를 들어 설명해주실 수 있나요?
// 4. 입사 후 3년 차에 전문가로 성장하여 프로젝트를 이끌고 싶다고 하셨는데, 그를 위해 어떤 계획을 가지고 계신가요?`;

//     const questions = teststr.split('\n').filter(q => q.trim() !== '');

    const questions = question.split('\n').filter(q => q.trim() !== '');
 

    const [aiFeedback, setaiFeedback] = useState([]);
    const handleSendAnswer = async (index) => {

        var selectedQuestion = questions[index];
        var selectedAnswer = userAnswer[index];

        console.log("핸들러","index:", index, "Question:", selectedQuestion, "Answer:", selectedAnswer);
        setIsLoading(true); // 로딩 시작
        dispatch(callInterviewAnswer({ question: selectedQuestion, answer: selectedAnswer}, (AIanswer, error) => {
            if (error) {
                console.error("오류", error);
            } else {
                setAIanswer(AIanswer.feedback);
                setaiFeedback(prevFeedbacks => {
                    const newFeedbacks = [...prevFeedbacks];
                    newFeedbacks[index] = AIanswer.feedback;
                    return newFeedbacks;
                })
            }
            setIsLoading(false); // 로딩 종료
        }));
    };

    const handleAnswerChange = (index, value) => {
        // e.stopPropagation();
        setuserAnswer(prev => { const newAnswers = [...prev];
             newAnswers[index] = value;
             return newAnswers;
        });
       
    };

    // 화면 작업은 return 내부에 작성한다.
    return (
        <>
            {/* 첫 화면에 나타날 내용 */}
            <div className={interviewstyle.container}>
                <div className={interviewstyle.header}><h1>AI 면접</h1>
                </div>
                <div className={interviewstyle.shoulder}><h3>이력서로 AI와 함께 면접을 준비해보세요</h3></div>
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
                <button className={styles.recommendationButton} onClick={handleQuestion}>AI 면접시작하기</button>
            </div>

            {/* 질문창과 답변 창을 중앙으로 정렬 */}
            <div className={interviewstyle.questionBoxWrapper}>
                {questions.map((q, index) => (
                    <div key={index} className={interviewstyle.questionBox}
                        onClick={() => handleToggle(index)}
                        style={{ cursor: 'pointer' }}>
                        <div><p>{q}</p></div>
                        {/* 토글된 상태에 따라 답변란 표시 */}
                        {isToggled[index] && (
                            <div className={interviewstyle.answerBoxs}
                                onClick={(e) => e.stopPropagation()}>
                                <input type="text"
                                    value={userAnswer[index] || ''} 
                                    onChange={(e) => handleAnswerChange(index, e.target.value, q, e)}
                                    autoComplete='off' placeholder="여기에 답변을 입력해주세요."></input>
                                <button className={interviewstyle.actionButton} onClick={() => handleSendAnswer(index)}>답변 하기</button>
                                {AIanswer[index] && (
                                    <div className={interviewstyle.feedback}>
                                        {AIanswer && <p>AI 피드백: {aiFeedback[index]}</p>}
                                    </div>)}
                            </div>
                        )}

                    </div>
                ))}
                
            </div>
            <LoadingScreen isLoading={isLoading} />
        </>
    )
}

export default UserInterview;
