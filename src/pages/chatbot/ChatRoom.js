import styles from './ChatRoom.module.css';
import bubbleIcon from '../mainpage/Icons/bubbleIcon.png';
import sendIcon from '../mainpage/Icons/Sent.png';
import { useState } from 'react';
import { callChatbot } from '../../apis/chatbotAPICalls';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ChatRoom = () => {

    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [gptMessage, setGptMessage] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [messageList, setMessageList] = useState([]); // 메시지 목록
    const dispatch = useDispatch();


    // ========================== 프롬프트 선택 ============================
   
    const startChat = () => {
        setShowChat(true); 
    };



    // =========================== 채팅 메세지 =============================

    const handleMessageChange = (e) => {
        setMessage(e.target.value); // 입력값을 message 상태에 반영
    }


    const sendMessage = () => {
        dispatch(callChatbot({message: message}, (result) => {
            const chatbotResponse = result.gptMessage;
            setMessage('');
            setMessageList([
                ...messageList,
                { sender: '사용자', content: message },
                { sender: '챗봇', content: chatbotResponse },
            ]);

        }));
    }




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
                                            <img src={bubbleIcon} alt='bubbleIcon' style={{width: "40px", height: "45px"}}/>
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
                            <div className={styles.chattingList}>
                                {messageList.map((msg, index) => (
                                    <div key={index} className={msg.sender === '사용자' ? styles.userMessage : styles.chatbotMessage}>
                                        {/* 실제 메시지 내용을 보여주는 부분 */}
                                        <p className={styles.messageBubble}>{msg.content}</p>
                                    </div>
                                ))}
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
                                    ></textarea>
                                    <button className={styles.messageSendBtn} onClick={sendMessage}>
                                        <img src={sendIcon} alt='sendIcon' style={{width: "30px", height: "35px"}}/>
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