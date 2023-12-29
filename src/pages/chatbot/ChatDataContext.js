// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [chatRooms, setChatRooms] = useState([]);
//   const userEmail = useSelector(state => state.auth.email);


//   // MongoDB에서 채팅 데이터 로드
//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/chatbot/chatrooms?email=${userEmail}`);
//         if (response.ok) {
//           const data = await response.json();
//           setChatRooms(data.chatroomList || []);
//         }
//       } catch (error) {
//         console.error("Failed to fetch chat rooms:", error);
//       }
//     };

//     if (userEmail) {
//       fetchChatRooms();
//     }
//   }, [userEmail]);

//   // 새 채팅방 추가
//   const addChatRoom = (newRoom) => {
//     setChatRooms(prevRooms => [...prevRooms, newRoom]);
//   };


//   const updateChatRoomMessages = (roomId, newMessage) => {
//     setChatRooms(prevRooms => {
//       return prevRooms.map(room => {
//         if (room.id === roomId) {
//           return {
//             ...room,
//             messages: [...room.messages, newMessage]
//           };
//         }
//         return room;
//       });
//     });
//   };

//   return (
//     <ChatContext.Provider value={{ chatRooms, addChatRoom, updateChatRoomMessages }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);
