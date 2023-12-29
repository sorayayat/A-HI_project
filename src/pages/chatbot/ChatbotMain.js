import React, { useState, useEffect} from 'react';
import ChatbotRoomList from "./ChatbotRoomList";
import ChatRoom from "./ChatRoom";
import styles from './ChatbotMain.module.css';
import { addChatRoomData } from '../../modules/chatbotModules';
import { useDispatch, useSelector } from 'react-redux';


// 채팅방 목록, 현재 활성화된 채팅방의 상태를 관리하고, 이를 자식 컴포넌트에 전달합니다.
const ChatbotMain = () => {

    // 채팅방 관련 상태관리
    const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록 상태
    const [activeChatRoomId, setActiveChatRoomId] = useState(null); // 현재 활성화된 채팅방 ID
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const userEmail = useSelector(state => state.auth.email);
    const dispatch = useDispatch();

    // 고유 ID 생성
    const generateUniqueID = () => {
        return window.crypto.randomUUID();
    };
    

    // 새 채팅방 생성
    const handleNewChat = () => {
        const newChatRoomId = generateUniqueID(); // 고유 ID 생성
        const newChatRoom = {
            roomId: newChatRoomId, // 필드명을 roomId로 변경
            messages: [],
            prompt: null
        };

        setChatRooms([...chatRooms, newChatRoom]);
        setActiveChatRoomId(newChatRoomId); // 새 채팅방을 활성화
    };


    // ChatbotMain에 새 메시지를 chatRooms 상태에 반영
    // ChatRoom컴포넌트에서 채팅이 이루어지면 그 채팅내용이 ChatList에도 최신화하여 반영
    const updateChatRoomsWithNewMessage = (roomId, newMessage) => {
        setChatRooms(prevChatRooms => {
            return prevChatRooms.map(room => {
                if (room.roomId === roomId) {
                    return {
                        ...room,
                        messages: [...room.messages, newMessage]
                    };
                }
                return room;
            });
        });
    };

    // =============================== 로그인된 사용자의 채팅데이터 불러오기 ======================================
    
    
    // 사용자의 모든 채팅방 데이터 불러오기
        const fetchAllChatRooms = async () => {
            try {
                const response = await fetch(`http://localhost:8000/chatbot/userchatrooms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail })
                });
                if (!response.ok) {
                    throw new Error('모든 채팅방 데이터 불러오기 실패');
                }
                const data = await response.json();
                console.log("Server response ============> ", data); // 서버 응답 로그 출력

                setChatRooms(data || []); // 로컬 상태 업데이트
                dispatch(addChatRoomData(data || [])); // Redux 스토어 업데이트
            } catch (error) {
                console.error(error);
            }
        };
    
    
        useEffect(() => {
            if (userEmail) {
                fetchAllChatRooms();
            }
        }, [userEmail]);
        
        
    // =============================== 특정 채팅방 눌렀을때  ======================================

    const handleSelectChatRoom = (roomId) => {
        setActiveChatRoomId(roomId); // 선택된 채팅방 ID로 상태 업데이트
    
    };

    // activeChatRoomId가 변경될 때 해당 ID에 해당하는 채팅방을 찾는 로직추가
    useEffect(() => {
        const foundRoom = chatRooms.find(room => room.roomId === activeChatRoomId);
        setSelectedChatRoom(foundRoom);
    }, [activeChatRoomId, chatRooms]);


    console.log('Rendering ChatbotRoomList with chatRooms:', chatRooms);

    return (
        <>
            <div className={styles.chatbotContainer}>
                {/* 왼쪽 채팅방 목록 영역 */}
                <div className={styles.roomlistMainContainer}>
                    
                    <ChatbotRoomList 
                        chatRooms={chatRooms}
                        onNewChat={handleNewChat}
                        onSelectChatRoom={handleSelectChatRoom}
                        activeChatRoomId={selectedChatRoom}
                    />
                </div>

                {/* 챗봇 내용 영역 */}
                <div className={styles.chatRoomContents}>
                    <ChatRoom
                        activeChatRoom={selectedChatRoom}
                        updateChatRoomsMessages={updateChatRoomsWithNewMessage}
                    />
                </div>
            </div>
        </>
    )
}



export default ChatbotMain;