import styles from './ChatRoom.module.css';
import bubbleIcon from '../mainpage/Icons/bubbleIcon.png';
import sendIcon from '../mainpage/Icons/Sent.png';

const ChatRoom = () => {
    return (
        <>
            {/* ChatbotMain에서 받아온 사용자 메세지와 챗봇 답변 props로 받아와서 화면에 보여줌 */}
            <div className={styles.messageListWrapper}>
                <div className={styles.messageList}>
                    <div className={styles.messageContainer}>
                        <div className={styles.messageItemScreen}>
                            {/* 채팅 시작 전 프롬프트 선택 화면 */}
                            {/* <div className={styles.chatDirection}>
                                <div className={styles.chatDirectionText}>
                                    <p>챗봇과 대화하며 이력서를 작성해보세요!</p>
                                </div>
                            </div> */}

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
                                        <div className={styles.promptBox1}>
                                            <div className={styles.box1Text}>
                                                <p>경력이 없는 <b>신입</b>이에요</p>
                                            </div>
                                        </div>
                                        <div className={styles.promptBox2}>
                                            <div className={styles.box2Text}>
                                                <p>이직을 원하는 <b>경력직</b>이에요</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 메세지 입력창 */}
                        <div className={styles.inputMessageArea}>
                            <div className={styles.inputMessageBar}>
                                <div className={styles.inputMessage}>
                                    <textarea rows={1} placeholder='챗봇에게 이력서와 관련된 질문을 해보세요.'></textarea>
                                    <button className={styles.messageSendBtn}>
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