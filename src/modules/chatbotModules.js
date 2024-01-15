export const CLEAR_CHATROOM_DATA = 'CHATROOM/CLEAR_CHATROOM_DATA';
export const ADD_MESSAGE_TO_CHATROOM = 'CHATROOM/ADD_MESSAGE_TO_CHATROOM';
export const ADD_CHATROOM_DATA = 'CHATROOM/ADD_CHATROOM_DATA';
export const DELETE_CHATROOM = 'CHATROOM/DELETE_CHATROOM';
export const SET_PROMPT = 'CHATROOM/SET_PROMPT';
export const SET_RESUME_DOWNLOADABLE = 'CHATROOM/SET_RESUME_DOWNLOADABLE';


const initialState = {
  _id: '',
  email: '',
  chatroomList: [],
  resumeDownloadable: false,
  resumePath: null,
};


// 채팅방 데이터 초기화 액션 생성자
export const clearChatRoomData = () => ({
  type: CLEAR_CHATROOM_DATA,
});


export const addMessageToChatRoom = (roomId, message) => ({
  type: ADD_MESSAGE_TO_CHATROOM,
  payload: { roomId, message },
});



export const addChatRoomData = (chatRooms) => ({
  type: ADD_CHATROOM_DATA,
  payload: { chatRooms },
});


export const deleteChatRoom = (roomId) => ({
  type: DELETE_CHATROOM,
  payload: { roomId },
});

export const setPrompt = (roomId, prompt) => ({
  type: SET_PROMPT,
  payload: { roomId, prompt },
});

// 이력서 다운로드 가능 상태 설정 액션 생성자
export const setResumeDownloadable = (roomId, downloadable, path) => ({
  type: SET_RESUME_DOWNLOADABLE,
  payload: { roomId, downloadable, path },
});




const chatbotReducer = (state = initialState, action) => {
  console.log('Initial State on Reducer Call:', state);
  console.log('Action Received:', action); 
  console.log('Current State:', state); 

  switch (action.type) {

    case CLEAR_CHATROOM_DATA:
      return {
        ...state,
        chatroomList: [],
      };

    case ADD_MESSAGE_TO_CHATROOM:
      const { roomId, message } = action.payload;
      console.log('chatroomList:', state.chatroomList); 

      const chatroomList = Array.isArray(state.chatroomList) ? state.chatroomList : [];
      console.log('Processed chatroomList (Array Check):', chatroomList); 

      // 해당 roomId를 갖는 채팅방 찾기 및 메시지 업데이트
      const updatedChatRooms = chatroomList.map(room => {
        console.log('Checking room:', room.roomId, 'against', roomId); 
        if (room.roomId === roomId) {
          console.log('Updating room with new messages', message); 
          return {
            ...room,
            messageList: message,
          };
        }
        return room;
      });

      console.log('Updated Chat Rooms:', updatedChatRooms); // 업데이트된 채팅방 목록 확인

      const updatedState = {
        ...state,
        chatroomList: updatedChatRooms,
      };

      console.log('Updated State:', updatedState); // 업데이트된 상태 확인
      return updatedState;


    case ADD_CHATROOM_DATA:
    const { chatRooms } = action.payload;
    return {
      ...state,
      chatroomList: chatRooms,
    };

    case DELETE_CHATROOM:
      return {
        ...state,
        chatroomList: state.chatroomList.filter(room => room.roomId !== action.payload.roomId),
      };


      case SET_PROMPT:
        const { roomId: promptRoomId, prompt } = action.payload;
        return {
          ...state,
          chatroomList: state.chatroomList.map(room =>
            room.roomId === promptRoomId ? { ...room, prompt } : room
          ),
        };


      case SET_RESUME_DOWNLOADABLE:
        return {
          ...state,
          resumeDownloadable: action.payload.resumeDownloadable,
          resumePath: action.payload.resumePath,
        };

        
    
    default:
      return state;
  }

};

export default chatbotReducer;



