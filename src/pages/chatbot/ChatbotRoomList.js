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
                {/* 채팅방 목록 영역 */}
                <div className={styles.roomListWrapper}>
                    <div className={styles.roomListMenu}>
                        <div className={styles.newButtonWrapper}>
                        <button className={styles.newChatBtn}>+ New Chat</button>
                        </div>
                        {/* 채팅 목록들 */}
                        <div className={styles.roomListMenuSet}>
                            <div className={styles.roomListMenu1}>
                                <p>목록</p>
                            </div>
                            <div className={styles.roomLists}>
                                {/* 최근 채팅 미리보기로 보여줌(실제 데이터 가져와야됨)*/}
                                {/* <input class={styles.createNewChat}></input> */}
                                <p className={styles.newOrExp}>신입</p>
                                <div class={styles.roomListItem}>
                                <p>{truncateText('취준생의 이력서 분석 및 자기소개서 작성 방향성',16)}</p>
                                </div>
                            </div>
                        </div>
                    {/* 도움말 메뉴 */}
                    </div>
                    <div className={styles.roomListMenu2}>
                        <p>도움말</p>
                    </div>
                </div>
        </>
    )
}

export default ChatbotRoomList;