const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL = `http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/userinterview`

export const calluserInterview = (userPDF, callback) => {

    const requestURL = `${FAST_PRE_URL}/userinterview`;
    return async (dispatch, getState) => {
        try {
            const PDFresult = await fetch(requestURL, {
                method: 'POST',
                
                body: userPDF
            });

            if (PDFresult.ok) {
                const data = await PDFresult.json();
                callback(data); // 콜백 함수를 호출하여 데이터 처리
            } else {
                console.error("Server responded with status", sandresult.status);
            }
        } catch (error) {
            console.error("Error while fetching", error);
        }
    }
}