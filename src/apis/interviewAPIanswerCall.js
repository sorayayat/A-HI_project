
const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL = `http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/userinterview`

export const callInterviewAnswer = (interviewData, callback) => {
    const requestURL = `${FAST_PRE_URL}/sendAnswer`; 
    console.log("call data : ",interviewData);
    return async (dispatch, getState) => {
        try {
            const sendAnswer = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(interviewData)
            });

            if (sendAnswer.ok) {
                const AIanswer = await sendAnswer.json();
                if (typeof callback === 'function') {
                    callback(AIanswer); // 콜백 함수를 호출하여 데이터 처리
                }
            } else {
                console.error("Server responded with status", sendAnswer.status);
                // 여기에 사용자에게 오류 상황을 알리는 코드를 추가할 수 있습니다.
            }
        } catch (error) {
            console.error("Error in callInterviewAnswer", error);
            // 오류 처리 로직을 추가할 수 있습니다.
        }
    }
}
