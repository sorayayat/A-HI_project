import React from 'react';
import styles from './ChatbotRoomList.module.css';


const ChatbotRoomList = ({ chatRooms, onNewChat, onSelectChatRoom, activeChatRoomId }) => {
    console.log("ChatbotRoomList rendering with chatRooms : ", chatRooms);
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
                            key={room.roomId}
                            className={`${styles.roomLists} ${room.roomId === activeChatRoomId ? styles.activeRoom : ''}`}
                            onClick={() => onSelectChatRoom(room.roomId)}
                        >
                            <p className={styles.newOrExp}>{room.prompt || '신입'}</p>
                            {/* 채팅방의 마지막 메시지 또는 기본 텍스트 표시 */}
                            <p>{
                            Array.isArray(room.messageList) && room.messageList.length > 0 
                            ? truncateText(room.messageList[room.messageList.length - 1].content, 16) 
                            : '채팅을 시작해보세요.'
                        }</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.roomListMenu2}>
                <p>도움말</p>
            </div>
        </div>
    );


}

export default ChatbotRoomList;