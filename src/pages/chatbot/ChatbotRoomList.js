import React from "react";
import styles from "./ChatbotRoomList.module.css";

const ChatbotRoomList = ({
  chatRooms,
  onNewChat,
  onSelectChatRoom,
  activeChatRoomId,
  onDeleteChatRoom,
}) => {
  console.log("ChatbotRoomList rendering with chatRooms : ", chatRooms);
  const truncateText = (text, maxLength) => {
    // text가 undefined, null 또는 빈 문자열이면 빈 문자열을 반환합니다.
    if (!text) {
      return "";
    }

    // text가 maxLength보다 길면 잘라내고 '...'을 추가합니다.
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }

    // text가 maxLength 이하이면 그대로 반환합니다.
    return text;
  };

  const handleDeleteClick = (e, roomId) => {
    e.stopPropagation(); // 채팅방 선택 이벤트 버블링 방지
    onDeleteChatRoom(roomId);
  };

  return (
    <div className={styles.roomListWrapper}>
      <div className={styles.roomListMenu}>
        <div className={styles.newButtonWrapper}>
          <button className={styles.newChatBtn} onClick={onNewChat}>
            + New Chat
          </button>
        </div>
        <div className={styles.roomListMenuSetWrapper}>
          <div className={styles.roomListMenuSet}>
            {chatRooms.map((room) => (
              <div
                key={room.roomId}
                className={`${styles.roomLists} ${
                  room.roomId === activeChatRoomId ? styles.activeRoom : ""
                }`}
                onClick={() => onSelectChatRoom(room.roomId)}
              >
                <p className={styles.newOrExp}>{room.prompt || "신입"}</p>
                {/* 채팅방의 마지막 메시지 또는 기본 텍스트 표시 */}
                <p>
                  {Array.isArray(room.messageList) &&
                  room.messageList.length > 0
                    ? truncateText(
                        room.messageList[room.messageList.length - 1].content,
                        16
                      )
                    : "채팅을 시작해 보세요!"}
                </p>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => handleDeleteClick(e, room.roomId)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.roomListMenu2}>
        <p>도움말</p>
      </div>
    </div>
  );
};

export default ChatbotRoomList;
