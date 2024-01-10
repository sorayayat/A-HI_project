import styles from './ChatRoom.module.css';
import sendIcon from '../mainpage/Icons/Sent.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';


const ChatRoom = ({ activeChatRoom, updateChatRoomsMessages, selectedPrompt, setSelectedPrompt }) => {

    const [userEmail, setUserEmail] = useState('');  
    const [message, setMessage] = useState('');
    // const [showChat, setShowChat] = useState(false);
    const [messageList, setMessageList] = useState([]); 
    const scrollRef = useRef(null);
    const [showResumeButton, setShowResumeButton] = useState(false);
    const [activeChatRoomResumePath, setActiveChatRoomResumePath] = useState(null);


    useEffect(() => {
        if (activeChatRoom && activeChatRoom.prompt) {
            setSelectedPrompt(activeChatRoom.prompt);
        }
        console.log("@@@@@@@@@@@@@@@@@@ selectedPrompt ===================> ", selectedPrompt)
    },[activeChatRoom])


    // 사용자 이메일 가져옴
    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfo && userInfo.email) {
            setUserEmail(userInfo.email);
        }
    }, []);



    // userEmail 상태가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log("현재 로그인한 사용자의 이메일 =========> ", userEmail);
    }, [userEmail]);
    

    // =========================== 채팅 메세지 =============================
    
    useEffect(() => {
        console.log("Updated messageList =============>", messageList);
    }, [messageList]);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messageList]);



    // activeChatRoom prop의 변경을 감지하고 이를 바탕으로 화면에 채팅 내용을 표시
    useEffect(() => {
        console.log("activeChatRoom ===========> ",activeChatRoom)
        if (activeChatRoom && activeChatRoom.messageList) {
            console.log("activeChatRoom.messages =============> ", activeChatRoom.messageList)
            setMessageList(activeChatRoom.messageList);
        }
    }, [activeChatRoom]);
    



    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }

    

    // 메세지 전송 함수
    const sendMessage = async () => {
        if (activeChatRoom) {

            const newUserMessage = { sender: '사용자', content: message };

            const payload = {
                email: userEmail, 
                roomId: activeChatRoom.roomId,
                prompt: selectedPrompt,
                message: message
            };

            console.log("PAYLOAD ===================> " ,payload)
    
            const response = await fetch('http://localhost:8000/chatbot/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log("========================== [sendMessage] chatbot_endpoint response ==========================\n", data);
            const newChatbotMessage = { sender: '챗봇', content: data.gptMessage };

            setMessage('');

            setMessageList(prevMessages => [...prevMessages, newUserMessage, newChatbotMessage]);

             // 새 메시지를 chatRooms 상태에 반영
            updateChatRoomsMessages(activeChatRoom.roomId, newUserMessage);
            updateChatRoomsMessages(activeChatRoom.roomId, newChatbotMessage);

            // 이력서 생성 버튼 표시 여부 결정 및 이력서 경로 설정
            if (data.resumeReady) {
                console.log("!!!!!!!!!!!!!!!!!!!!!이력서 준비됨: ", data.resumeReady);
                setShowResumeButton(true);
                setActiveChatRoomResumePath(data.resumePath);
            }
        }
    };

    useEffect(() => {
        console.log("activeChatRoom 변경됨: ", activeChatRoom);
        if (activeChatRoom && activeChatRoom.resumePath) {
            console.log("이력서 파일 URL: ", activeChatRoom.resumePath);
        }
    }, [activeChatRoom]);



    const handleDownloadResume = async () => {
        if (activeChatRoomResumePath) {
            const filename = activeChatRoomResumePath.split('/').pop();
            window.location.href = `http://localhost:8000/chatbot/download/${filename}`;
        }
    };
    

    // const handleDownloadResume = () => {
    //     if (activeChatRoomResumePath) {
    //         window.location.href = activeChatRoomResumePath; // 이력서 파일 URL로 직접 이동
    //     }
    // };
    

    return (
        <>
            {/* ChatbotMain에서 받아온 사용자 메세지와 챗봇 답변 props로 받아와서 화면에 보여줌 */}
            <div className={styles.messageListWrapper}>
                <div className={styles.messageList}>
                    <div className={styles.messageContainer}>
                        {/* 사용자가 프롬프트 선택 후 채팅을 진행할 경우 */}
                        <div className={styles.chattingScrollContainer}>
                            <div className={styles.chattingList} ref={scrollRef}>
                                {activeChatRoom && Array.isArray(activeChatRoom.messageList) && 
                                    activeChatRoom.messageList.map((msg, index) => (
                                        <div key={`${msg.sender}-${msg.content}-${index}`} className={msg.sender === '사용자' ? styles.userMessage : styles.chatbotMessage}>
                                            <p className={styles.messageBubble} style={{ whiteSpace: 'pre-wrap' }}>
                                                {msg.content}
                                                    {/* 조건부 렌더링으로 버튼 추가 */}
                                                    {/* 챗봇의 메시지에 특정 텍스트가 포함되어 있을 때만 이력서 버튼을 표시합니다. */}
                                                    {msg.sender === '챗봇' && msg.content.includes("이력서에 필요한 정보 수집이 완료되었습니다!") && showResumeButton && activeChatRoomResumePath && (
                                                        <button onClick={handleDownloadResume} className={styles.resumeButton}>
                                                            이력서 다운로드
                                                        </button>
                                                    )}
                                            </p>
                                        </div>
                                ))}
                                {/* 이력서 생성하기 버튼을 말풍선 목록 마지막에 추가 */}
                            </div>
                        </div>
                        

                        {/* 메세지 입력창 */}
                        <div className={styles.inputMessageArea}>
                            <div className={styles.inputMessageBar}>
                                <div className={styles.inputMessage}>
                                    <textarea
                                        rows={1}
                                        placeholder='챗봇에게 이력서와 관련된 질문을 해보세요.'
                                        value={message}
                                        onChange={handleMessageChange}
                                        onKeyDown={handleKeyDown}
                                    ></textarea>
                                    <button className={styles.messageSendBtn} onClick={sendMessage}>
                                        <img src={sendIcon} alt='sendIcon' style={{ width: "30px", height: "35px" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ChatRoom;