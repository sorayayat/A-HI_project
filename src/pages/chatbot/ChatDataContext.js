import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatDataContext = createContext();

export const useChatData = () => useContext(ChatDataContext);

export const ChatDataProvider = ({ children }) => {
    const [chatData, setChatData] = useState({
        chatRooms: [],
        activeChatRoomId: null
    });
    const userEmail = useSelector(state => state.auth.email); // Redux 상태에서 이메일 가져오기

    // 현재 활성화된 채팅방 ID를 업데이트
    const setActiveChatRoomId = (roomId) => {
        setChatData({ ...chatData, activeChatRoomId: roomId });
    };

    // 채팅 데이터를 업데이트
    const updateChatData = (newData) => {
        setChatData({ ...chatData, ...newData });
    };

    // 사용자의 채팅 데이터를 불러옴
    const fetchChatData = async () => {
        if (!userEmail || !chatData.activeChatRoomId) return;

        try {
            const response = await fetch(`http://localhost:8000/chatbot/chatrooms/${chatData.activeChatRoomId}?email=${userEmail}`);
            if (response.ok) {
                const data = await response.json();
                setChatData({ ...chatData, chatRooms: data.chatRooms });
            } else {
                console.error('Failed to fetch chat data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchChatData();
    }, [userEmail, chatData.activeChatRoomId]);

    return (
        <ChatDataContext.Provider value={{ chatData, updateChatData, setActiveChatRoomId }}>
            {children}
        </ChatDataContext.Provider>
    );
};
