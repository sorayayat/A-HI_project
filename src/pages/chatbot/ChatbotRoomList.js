import React from 'react';
import styles from './ChatbotRoomList.module.css';


// 채팅방 목록, 새 채팅방 생성 버튼 클릭 이벤트, 현재 선택된 채팅방의 상태를 ChatbotMain으로부터 props로 받아야 합니다.
const ChatbotRoomList = ({ chatRooms, onNewChat, onSelectChatRoom, activeChatRoomId }) => {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };


    return (
        <div className={styles.roomListWrapper}>
            <div className={styles.roomListMenu}>
                <div className={styles.newButtonWrapper}>
                    <button className={styles.newChatBtn} onClick={onNewChat}>+ New Chat</button>
                </div>
                <div className={styles.roomListMenuSet}>
                    {chatRooms.map((room) => (
                        <div
                            key={room.id}
                            className={`${styles.roomLists} ${room.id === activeChatRoomId ? styles.activeRoom : ''}`}
                            onClick={() => onSelectChatRoom(room.id)}
                        >
                            <p className={styles.newOrExp}>{room.prompt || '신입'}</p>
                            {/* 채팅방의 마지막 메시지 또는 기본 텍스트 표시 */}
                            <p>{room.messages.length > 0 ? truncateText(room.messages[room.messages.length - 1].content, 16) : '채팅을 시작해보세요.'}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.roomListMenu2}>
                <p>도움말</p>
            </div>
        </div>
    );















    // return (
    //     <>
    //             {/* 채팅방 목록 영역 */}
    //             <div className={styles.roomListWrapper}>
    //                 <div className={styles.roomListMenu}>
    //                     <div className={styles.newButtonWrapper}>
    //                     <button className={styles.newChatBtn}>+ New Chat</button>
    //                     </div>
    //                     {/* 채팅 목록들 */}
    //                     <div className={styles.roomListMenuSet}>
    //                         <div className={styles.roomListMenu1}>
    //                             <p>목록</p>
    //                         </div>
    //                         <div className={styles.roomLists}>
    //                             {/* 최근 채팅 미리보기로 보여줌(실제 데이터 가져와야됨)*/}
    //                             {/* <input class={styles.createNewChat}></input> */}
    //                             <p className={styles.newOrExp}>신입</p>
    //                             <div class={styles.roomListItem}>
    //                             <p>{truncateText('취준생의 이력서 분석 및 자기소개서 작성 방향성',16)}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 {/* 도움말 메뉴 */}
    //                 </div>
    //                 <div className={styles.roomListMenu2}>
    //                     <p>도움말</p>
    //                 </div>
    //             </div>
    //     </>
    // )
}

export default ChatbotRoomList;