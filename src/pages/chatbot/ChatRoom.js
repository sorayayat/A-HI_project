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
    const websocket = useRef(null);
    const [showResumeButton, setShowResumeButton] = useState(false);



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


    // 채팅 시작 시 웹소켓 연결
    useEffect(() => {
        if (activeChatRoom && activeChatRoom.roomId) {
            const roomId = activeChatRoom.roomId;
                websocket.current = new WebSocket(`ws://localhost:8000/ws/${roomId}`);

                websocket.current.onopen = () => {
                    console.log('[useEffect] WebSocket 연결... ');
                };

                websocket.current.onmessage = (event) => {
                    console.log('메시지 수신 =============> ', event.data);
                    if (event.data === "데이터 수집 완료. 이력서를 생성할 수 있습니다.") {
                        setShowResumeButton(true);
                    }
                };
                
                websocket.current.onclose = () => {
                    console.log('WebSocket Disconnected');
                };
            
                websocket.current.onerror = (error) => {
                    console.error('WebSocket Error:', error);
                };

                return () => {
                    websocket.current.close();
                };
            }
        }, [activeChatRoom]);






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

            const newChatbotMessage = { sender: '챗봇', content: data.gptMessage };

                setMessage('');

            setMessageList(prevMessages => [...prevMessages, newUserMessage, newChatbotMessage]);

             // 새 메시지를 chatRooms 상태에 반영
            updateChatRoomsMessages(activeChatRoom.roomId, newUserMessage);
            updateChatRoomsMessages(activeChatRoom.roomId, newChatbotMessage);
        }
    };


    const handleCreateResume = async () => {
        console.log("이력서 생성 요청 동작...")
        // 서버로 이력서 생성 요청 보내기
        try {
            const response = await fetch('http://localhost:8000/create-resume/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    roomId: activeChatRoom.roomId
                })
            });
            const data = await response.json();
    
            // 서버로부터의 응답 처리
            if (data.success) {
                console.log('이력서 생성 성공:', data);
                // 성공 메시지 표시 또는 다른 UI 처리
            } else {
                console.log('이력서 생성 실패:', data);
                // 실패 메시지 표시 또는 다른 UI 처리
            }
        } catch (error) {
            console.error('이력서 생성 요청 중 오류 발생:', error);
            // 오류 메시지 표시 또는 다른 UI 처리
        }
    };



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
                                            </p>
                                        </div>
                                ))}
                                {/* 이력서 생성하기 버튼을 말풍선 목록 마지막에 추가 */}
                                {showResumeButton && (
                                    <div className={styles.resumeButtonContainer}>
                                        <button onClick={handleCreateResume} className={styles.resumeButton}>
                                            이력서 생성하기
                                        </button>
                                    </div>
                                )}
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