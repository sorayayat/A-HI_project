
const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/interview`

export const callChatbot = (message, callback) => {
    const requestURL = "http://localhost:8000/chatbot";
    return async(dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            if (result.ok) {
                const data = await result.json();
                callback(data); // 콜백 함수를 호출하여 데이터 처리
            } else {
                console.error("Server responded with status", result.status);
            }
        } catch (error) {
            console.error("Error while fetching", error);
        }
    }
}