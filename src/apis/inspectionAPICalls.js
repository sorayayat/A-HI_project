import { postAsk } from "../modules/inspectionModule";

const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/inspection`


export const callInspectionAskAPI = (form) =>{
    const requestURL = `${FAST_PRE_URL}/aks`;
    return async(dispath, getState) =>{
        const result = await fetch(requestURL,{
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(form)
        }).then(resp => resp.json());
        if(result.status === 200){
            // console.log("[callInspectionAskAPI] callInspectionAskAPI : {}",result);
            dispath(postAsk(result));
        }
    }
}