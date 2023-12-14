import ChatbotRoomListItem from "./ChatbotRoomListItem";
import styles from './ChatbotRoomList.module.css';

const ChatbotRoomList = () => {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };


    return (
        <>
            <div className={styles.roomlistMainContainer}>
                <div className={styles.roomListWrapper}>
                    <div className={styles.newButtonWrapper}>
                    <button className={styles.newChatBtn}>+ New Chat</button>
                    </div>
                    <div className={styles.roomListmenu}>
                        <div className={styles.roomListmenu1}>
                            <p>목록</p>
                        </div>
                        {/* 채팅 목록들 */}
                        <div className={styles.roomLists}>
                            {/* 최근 채팅 미리보기로 보여줌(실제 데이터 가져와야됨)*/}
                            {/* <input class={styles.createNewChat}></input> */}
                            <div class={styles.roomListItem}>
                            <p>{truncateText('취준생의 이력서 분석 및 자기소개서 작성 방향성',16)}</p>
                            </div>
                        </div>
                        <div className={styles.roomListmenu2}>
                            <p>도움말</p>
                        </div>
                    </div>

                    <div className={styles.chatbotRoomInfo}>
                        <ChatbotRoomListItem />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatbotRoomList;