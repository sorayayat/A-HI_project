
const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/interview`

export const callInterview = ({searchQuery}) => {

    console.log("typeof search" , typeof searchQuery)
    const requestURL = `${FAST_PRE_URL}/`;
    return async(dispatch, getState) => {
        const result = await fetch(requestURL,{
            method: 'POST', 
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ query: searchQuery })
        }).then(resp => resp.json());
        if(result.status === 200){
            
        }
    }

}