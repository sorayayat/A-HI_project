import React, { useState, useEffect } from 'react';
import ChatbotRoomList from "./ChatbotRoomList";
import ChatRoom from "./ChatRoom";
import styles from './ChatbotMain.module.css';

// 메인 화면에 왼쪽은 채팅리스트, 오른쪽에는 a진행중인 채팅을 보여줄 것
// ChatbotRoomList랑 ChatRoom에 필요한 데이터 여기서 관리하고, 양쪽 컴포넌트에 props로 다 전달 

const ChatbotMain = () => {

    return (
        <>
            <div className={styles.chatbotContainer}>
                {/* 왼쪽 채팅방 목록 영역 */}
                <div className={styles.roomlistMainContainer}>
                    <ChatbotRoomList />
                </div>

                {/* 챗봇 내용 영역 */}
                <div className={styles.chatRoomContents}>
                    <ChatRoom/>
                </div>
            </div>
        </>
    )
}

export default ChatbotMain;