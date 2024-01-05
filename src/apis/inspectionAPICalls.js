import { getResume, getResumelist, postAsk, postModify } from "../modules/inspectionModule";
import { json, useNavigate } from "react-router";

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

export const callResumeDetailAPI = (resumeCode) =>{
    const requestURL = `${SB_PRE_URL}/getResume/${resumeCode}`;
    console.log(resumeCode);
    return async(dispath,getState) =>{
        const result = await fetch(requestURL).then(resp => resp.json());
        if(result.status === 200)
        {
            result.data = Object.assign({}, result.data,{"resumeCode" : resumeCode});
            dispath(getResume(result));
            return {status : 200}
        }
    }
}

export const callModifyResumeAPI = (form , index) => {
    const requestURL = `${SB_PRE_URL}/modifyResume`;
    console.log(index)
    return async(dispath , getState) =>{
        const result = await fetch(requestURL,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(form)
        }).then(resp => resp.json());
        if(result.status === 200){
            result.data = Object.assign({}, result.data,{"index" : index});
            dispath(postModify(result));
            return {status : 200}
        }
    }
}
 export const callImageToPdfAPI = (form) =>{
    const requestURL = `${SB_PRE_URL}/saveResume`;
    return async(dispath , getState) =>{
        console.log(form.get("resumeCode"))
        console.log(form.get("image"))
        // const result = await fetch(requestURL,{
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "multipart/form-data"
        //     },
        //     body : form
        // }).then(resp => resp.json());
        // return {status : result.status}
    }
    
}