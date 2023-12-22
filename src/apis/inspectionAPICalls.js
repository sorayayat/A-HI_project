import { get } from "react-scroll/modules/mixins/scroller";
import { getResume, getResumelist, postAsk } from "../modules/inspectionModule";

const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const SB_SERVER_PORT = `${process.env.REACT_APP_FAST_SB_SERVER_PORT}`;
const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/inspection`
const SB_PRE_URL = `http://${FAST_SERVER_IP}:${SB_SERVER_PORT}/inspection`


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

export const callInspectionResumeAPI = () =>{
    const requestURL = `${SB_PRE_URL}/getResumeList`;
    return async(dispath,getState) =>{
        const result = await fetch(requestURL).then(resp => resp.json());
        if(result.status === 200)
        {
            dispath(getResumelist(result));
        }
    }
}

// export const callResumeDetailAPI = (resumeCode) =>{
//     const requestURL = `${SB_PRE_URL}/getResume/${resumeCode}`;
//     return async(dispath,getState) =>{
//         console.log(resumeCode);
//         const result = await fetch(requestURL).then(resp => resp.json());
//         if(result.status === 200)
//         {
//             console.log("h2h2")
//         }
//     }
// }