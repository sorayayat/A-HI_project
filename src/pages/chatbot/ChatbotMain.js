import React, { useState, useEffect} from 'react';
import ChatbotRoomList from "./ChatbotRoomList";
import ChatRoom from "./ChatRoom";
import styles from './ChatbotMain.module.css';

// 채팅방 목록, 현재 활성화된 채팅방의 상태를 관리하고, 이를 자식 컴포넌트에 전달합니다.
const ChatbotMain = () => {

    // 채팅방 관련 상태관리
    const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록 상태
    const [activeChatRoomId, setActiveChatRoomId] = useState(null); // 현재 활성화된 채팅방 ID


    // 고유 ID 생성
    const generateUniqueID = () => {
        return window.crypto.randomUUID();
    };
    

    // 새 채팅방 생성
    const handleNewChat = () => {
        const newChatRoomId = generateUniqueID(); // 고유 ID 생성
        const newChatRoom = {
            id: newChatRoomId,
            messages: [],
            prompt: null
        };

        setChatRooms([...chatRooms, newChatRoom]);
        setActiveChatRoomId(newChatRoomId); // 새 채팅방을 활성화
    };


    // 특정 채팅방 선택시 해당 채팅방 활성화
    const handleSelectChatRoom = (roomId) => {
        setActiveChatRoomId(roomId);
    };


    // ChatbotMain에 새 메시지를 chatRooms 상태에 반영
    // ChatRoom컴포넌트에서 채팅이 이루어지면 그 채팅내용이 ChatList에도 최신화하여 반영해야 하기 때문
    const updateChatRoomsWithNewMessage = (roomId, newMessage) => {
        setChatRooms(prevChatRooms => {
            return prevChatRooms.map(room => {
                if (room.id === roomId) {
                    return {
                        ...room,
                        messages: [...room.messages, newMessage]
                    };
                }
                return room;
            });
        });
    };

    // const updateChatRoomsMessages = (roomId, newMessage) => {
    //     setChatRooms(chatRooms.map(room => {
    //         if (room.id === roomId) {
    //             return { ...room, messages: [...room.messages, newMessage] };
    //         }
    //         return room;
    //     }));
    // };




    return (
        <>
            <div className={styles.chatbotContainer}>
                {/* 왼쪽 채팅방 목록 영역 */}
                <div className={styles.roomlistMainContainer}>
                    <ChatbotRoomList 
                        chatRooms={chatRooms}
                        onNewChat={handleNewChat}
                        onSelectChatRoom={handleSelectChatRoom}
                        activeChatRoomId={activeChatRoomId}
                    />
                </div>

                {/* 챗봇 내용 영역 */}
                <div className={styles.chatRoomContents}>
                    <ChatRoom
                        activeChatRoom={chatRooms.find(room => room.id === activeChatRoomId)}
                        updateChatRoomsMessages={ updateChatRoomsWithNewMessage }
                    />
                </div>
            </div>
        </>
    )
}



export default ChatbotMain;