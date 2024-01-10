const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL = `http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/userinterview`

export const calluserInterview = ({file}, callback) => {
    const requestURL = `${FAST_PRE_URL}/userinterview`;
    return async (dispatch) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                body: file
            });
            const data = await result.json();
                console.log(result)
            if (result.ok) {
                if(typeof callback === 'function'){
                callback(data);}
            } else {
                console.error("error", result.status);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };
};
