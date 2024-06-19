import React, { useState, useEffect } from "react";
import ChatbotRoomList from "./ChatbotRoomList";
import ChatRoom from "./ChatRoom";
import styles from "./ChatbotMain.module.css";
import { addChatRoomData } from "../../modules/chatbotModules";
import { deleteChatRoom } from "../../modules/chatbotModules";
import { clearChatRoomData } from "../../modules/chatbotModules";
import { useDispatch, useSelector } from "react-redux";
import bubbleIcon from "../mainpage/Icons/bubbleIcon.png";
import { setPrompt } from "../../modules/chatbotModules";
import { setResumeDownloadable } from '../../modules/chatbotModules';


const ChatbotMain = () => {
  // 채팅방 관련 상태관리
  const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록 상태
  const [activeChatRoomId, setActiveChatRoomId] = useState(null); // 현재 활성화된 채팅방 ID
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const chatroomListFromStore = useSelector((state) => state.chatbotReducer.chatroomList);

  const updateSelectedChatRoom = (updatedData) => {
    setSelectedChatRoom(prevRoom => ({ ...prevRoom, ...updatedData }));
    console.log("@@@@@@@@@@updateSelectedChatRoom 호출됨, updatedData: ", updatedData);
    console.log("@@@@@@@@@@updateSelectedChatRoom 호출됨, updatedData: ", updatedData.resumePath);

    // resumePath가 존재할 경우에만 chatRooms 상태 업데이트
    if (updatedData.resumePath) {
      console.log("if (updatedData.resumePath) 넘어감")
      setChatRooms(prevRooms => {
          return prevRooms.map(room => {
              if (room.roomId === activeChatRoomId) {
                  return { ...room, ...updatedData };
              }
              return room;
          });
      });
  }
};

  
  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      setIsLoggedIn(true);
      setUserEmail(userInfo.email);
      fetchAllChatRooms(userInfo.email); // 사용자 이메일로 채팅방 데이터 불러오기
    }
  }, []);




  // 고유 ID 생성
  const generateUniqueID = () => {
    return window.crypto.randomUUID();
  };



  // 새 채팅방 생성
  const createNewChatRoom = () => {
    if (selectedPrompt) {
      const newChatRoomId = generateUniqueID();
      const newChatRoom = {
        roomId: newChatRoomId,
        messageList: [],
        prompt: selectedPrompt,
      };
      dispatch(addChatRoomData([...chatRooms, newChatRoom]));
      dispatch(setPrompt(newChatRoomId, selectedPrompt));
      setChatRooms([...chatRooms, newChatRoom]);
      setActiveChatRoomId(newChatRoomId);
    } else {
      console.log("프롬프트를 선택해주세요.");
    }
  };



  // newChatButton 누르면 프롬프트 선택화면으로 이동
  const handleNewChatButtonClick = () => {
    setSelectedPrompt(null); // 프롬프트 상태 초기화
    setActiveChatRoomId(null); // 활성화된 채팅방 ID 초기화
    setSelectedChatRoom(null); // 선택된 채팅방 상태 초기화
  };



  // 프롬프트 선택 로직
  const handlePromptSelection = (prompt) => {
    setSelectedPrompt(prompt);
    // createNewChatRoom(); // 새 채팅방 생성
  };


  
  useEffect(() => {
    if (selectedPrompt) {
      createNewChatRoom();
    }
  }, [selectedPrompt]);



  // 프롬프트 선택화면 함수
  const renderPromptSelection = () => {
    return (
      <div className={styles.messageListWrapper}>
        <div className={styles.messageList}>
          <div className={styles.messageContainer}>
            <div className={styles.messageItemScreen}>
              <div className={styles.promptSelect}>
                <div className={styles.prompt}>
                  {/* 아이콘 */}
                  <div className={styles.bubbleIcon}>
                    <img
                      src={bubbleIcon}
                      alt="bubbleIcon"
                      style={{ width: "55px", height: "50px" }}
                    />
                  </div>
                  <div className={styles.promptTitle}>
                    경력 유무에 따라 질문할 수 있어요
                  </div>
                  <div className={styles.titleBoxMarjin}></div>
                  <div className={styles.promptBox}>
                    <div
                      className={styles.promptBox1}
                      onClick={() => handlePromptSelection("신입")}
                    >
                      <div className={styles.box1Text}>
                        <p>
                          경력이 없는 <b>신입</b>이에요
                        </p>
                      </div>
                    </div>
                    <div
                      className={styles.promptBox2}
                      onClick={() => handlePromptSelection("경력직")}
                    >
                      <div className={styles.box2Text}>
                        <p>
                          이직을 원하는 <b>경력직</b>이에요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      setIsLoggedIn(true);
      setUserEmail(userInfo.email);
      fetchAllChatRooms(userInfo.email); // 사용자 이메일로 채팅방 데이터 불러오기
    } else {
      setIsLoggedIn(false);
      setUserEmail("");
      setChatRooms([]); // 로그인하지 않은 경우 채팅방 데이터 초기화
      dispatch(clearChatRoomData()); // Redux 스토어의 채팅방 데이터도 초기화
    }
  }, [sessionStorage.getItem("userInfo")]);




  // 채팅 메시지가 추가될 때마다 ChatRoom 컴포넌트에서 이를 ChatbotMain 컴포넌트의 chatRooms 상태에 반영
  const updateChatRoomsWithNewMessage = (roomId, newMessage) => {
    setChatRooms((prevChatRooms) => {
      return prevChatRooms.map((room) => {
        if (room.roomId === roomId) {
          return {
            ...room,
            messageList: [...room.messageList, newMessage],
          };
        }
        return room;
      });
    });
  };



  // 로그인된 사용자의 모든 채팅방 데이터 불러오기
  const fetchAllChatRooms = async (userEmail) => {
    try {
      const response = await fetch(
        `http://localhost:8000/chatbot/userchatrooms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      if (!response.ok) {
        throw new Error("모든 채팅방 데이터 불러오기 실패");
      }
      const data = await response.json();
      console.log("Server response ============> ", data); // 서버 응답 로그 출력
      setChatRooms(data || []); // 로컬 상태 업데이트
      dispatch(addChatRoomData(data || [])); // Redux 스토어 업데이트
    } catch (error) {
      console.error(error);
    }
  };

  // 채팅방 선택했을때 활성화된 채팅방으로 상태값 변경
  // const handleSelectChatRoom = (roomId) => {
  //     const foundRoom = chatRooms.find(room => room.roomId === roomId);
  //     setActiveChatRoomId(roomId); // 활성화된 채팅방 ID 설정
  //     setSelectedChatRoom(foundRoom); // 선택된 채팅방 설정
  //     if (foundRoom) {
  //         // 이미 존재하는 채팅방이면 해당 채팅방의 프롬프트를 가져와서 설정
  //         const roomPrompt = foundRoom.prompt || null;
  //         setSelectedPrompt(roomPrompt);
  //     }
  // };

  const handleSelectChatRoom = (roomId) => {
    const foundRoom = chatRooms.find((room) => room.roomId === roomId);
    setActiveChatRoomId(roomId); // 활성화된 채팅방 ID 설정
    setSelectedChatRoom(foundRoom); // 선택된 채팅방 설정
  };




  // activeChatRoomId가 변경될 때 해당 ID에 해당하는 채팅방을 찾음
  useEffect(() => {
    const foundRoom = chatRooms.find(
      (room) => room.roomId === activeChatRoomId
    );
    setSelectedChatRoom(foundRoom);
  }, [activeChatRoomId, chatRooms]);
  console.log("Rendering ChatbotRoomList with chatRooms:", chatRooms);
  console.log("selectedChatRoom ===============> ", selectedChatRoom);
  // 채팅방 삭제
  const handleDeleteChatRoom = async (email, roomId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/chatbot/deleteChatRoom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, roomId }),
        }
      );
      if (response.ok) {
        // Redux 스토어 업데이트
        dispatch(deleteChatRoom(roomId));
      } else {
        console.error("채팅방 삭제 실패");
      }
    } catch (error) {
      console.error("채팅방 삭제 에러 발생 ", error);
    }
  };



  useEffect(() => {
    setChatRooms(chatroomListFromStore);
  }, [chatroomListFromStore]);
  return (
    <>
      <div className={styles.chatbotContainer}>
        {/* 왼쪽 채팅방 목록 영역 */}
        <div className={styles.roomlistMainContainer}>
          <ChatbotRoomList
            chatRooms={chatRooms}
            onNewChat={handleNewChatButtonClick}
            onSelectChatRoom={handleSelectChatRoom}
            activeChatRoomId={activeChatRoomId}
            selectedPrompt={selectedPrompt}
            onDeleteChatRoom={(roomId) =>
              handleDeleteChatRoom(userEmail, roomId)
            }
          />
        </div>
        {/* 챗봇 내용 영역 */}
        {/* 선택한 채팅방(selectedChatRoom)이 있고, 해당 채팅방의 prompt가 있을 때만 ChatRoom 컴포넌트를 렌더링, null일 경우 프롬프트 선택화면 보여줌 */}
        <div className={styles.chatRoomContents}>
          {selectedChatRoom ? (
            <ChatRoom
              activeChatRoom={selectedChatRoom}
              updateChatRoomsMessages={updateChatRoomsWithNewMessage}
              selectedPrompt={selectedPrompt}
              setSelectedPrompt={setSelectedPrompt}
              updateSelectedChatRoom={updateSelectedChatRoom} // 콜백 함수 전달
            />
          ) : (
            renderPromptSelection()
          )}
        </div>
      </div>
    </>
  );
};
export default ChatbotMain;