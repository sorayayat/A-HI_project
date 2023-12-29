import styles from './ChatRoom.module.css';
import bubbleIcon from '../mainpage/Icons/bubbleIcon.png';
import sendIcon from '../mainpage/Icons/Sent.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';


const ChatRoom = ({ activeChatRoom, updateChatRoomsMessages }) => {

    const userEmail = useSelector(state => state.auth.email); 
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [messageList, setMessageList] = useState([]); 
    const scrollRef = useRef(null);



    // userEmail 상태가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log("현재 로그인한 사용자의 이메일 =========> ", userEmail);
    }, [userEmail]);
    


    // ========================== 프롬프트 선택 ============================

    const startChat = (promptType) => {
        setSelectedPrompt(promptType);
        setShowChat(true);
    };

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
            setShowChat(true);
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
        if (activeChatRoom && activeChatRoom.id) {

            const newUserMessage = { sender: '사용자', content: message };

            const payload = {
                email: userEmail, 
                roomId: activeChatRoom.id,
                prompt: selectedPrompt,
                message: message
            };
    
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






    return (
        <>
            {/* ChatbotMain에서 받아온 사용자 메세지와 챗봇 답변 props로 받아와서 화면에 보여줌 */}
            <div className={styles.messageListWrapper}>
                <div className={styles.messageList}>
                    <div className={styles.messageContainer}>
                        {/* 사용자가 프롬프트 선택하기 전 */}
                        {!showChat && (
                            <div className={styles.messageItemScreen}>
                                <div className={styles.promptSelect}>
                                    <div className={styles.prompt}>
                                        {/* 아이콘 */}
                                        <div className={styles.bubbleIcon}>
                                            <img src={bubbleIcon} alt='bubbleIcon' style={{ width: "40px", height: "45px" }} />
                                        </div>
                                        <div className={styles.promptTitle}>
                                            경력 유무에 따라 질문할 수 있어요
                                        </div>
                                        <div className={styles.titleBoxMarjin}></div>
                                        <div className={styles.promptBox}>
                                            <div className={styles.promptBox1} onClick={() => startChat('신입')}>
                                                <div className={styles.box1Text}>
                                                    <p>경력이 없는 <b>신입</b>이에요</p>
                                                </div>
                                            </div>
                                            <div className={styles.promptBox2} onClick={() => startChat('경력직')}>
                                                <div className={styles.box2Text}>
                                                    <p>이직을 원하는 <b>경력직</b>이에요</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* 사용자가 프롬프트 선택 후 채팅을 진행할 경우 */}
                        {showChat && (
                            <div className={styles.chattingScrollContainer}>
                                <div className={styles.chattingList} ref={scrollRef}>
                                    {activeChatRoom.messageList.map((msg, index) => (
                                        <div key={`${msg.sender}-${msg.content}-${index}`} className={msg.sender === 
                                        '사용자' ? styles.userMessage : styles.chatbotMessage}>
                                            <p className={styles.messageBubble} style={{ whiteSpace: 'pre-wrap' }}>
                                                {msg.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        )}



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