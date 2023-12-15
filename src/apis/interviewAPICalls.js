
const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/interview`

export const callInterview = (/* 넘겨줄 값 없으면 비워도됌 */) => {
    const requestURL = `${FAST_PRE_URL}/여기다가 서버 API 주소`;
    return async(dispatch, getState) => {
        const result = await fetch(requestURL,{
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
        }).then(resp => resp.json());
        if(result.status === 200){
            
        }
    }

}