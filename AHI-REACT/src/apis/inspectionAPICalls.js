import { getContent, getPostings, postAsk, postModify, postNew, postResume, postResumelist } from "../modules/inspectionModule";
import { json, useNavigate } from "react-router";

const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;
const SB_SERVER_PORT = `${process.env.REACT_APP_FAST_SB_SERVER_PORT}`;
const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/inspection`
const SB_PRE_URL = `http://${FAST_SERVER_IP}:8001/inspection`


export const callInspectionAskAPI = (form) =>{
    const requestURL = `${FAST_PRE_URL}/aks`;
    return async(dispath, getState) =>{
        const result = await fetch(requestURL,{
            method: 'POST',
            headers : {
                "Content-Type" : "application/json",            
            },
            body : JSON.stringify(form)
        }).then(resp => resp.json());
        if(result.status === 200){
            // console.log("[callInspectionAskAPI] callInspectionAskAPI : {}",result);
            dispath(postAsk(result));
        }
    }
}

export const callInspectionResumeAPI = (info) =>{
    const requestURL = `${SB_PRE_URL}/getResumeList`;
    return async(dispath,getState) =>{
        console.log(info)
        const result = await fetch(requestURL ,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(info)
        }).then(resp => resp.json());
        if(result.status === 200)
        {
            dispath(postResumelist(result));
        }
    }
}

export const callPafRaderAPI = (file) =>{
    console.log(file.get('file'))
    const requestURL = `${SB_PRE_URL}/getPdf`;
    return async(dispath, getState) =>{
        const result = await fetch(requestURL,{
            method : 'POST',
            body : file
        }).then(resp => resp.json());
        if(result.status === 200){
           dispath(postResume(result));
           return {status : result.status}
        }
    }
}

export const callResumeDetailAPI = (info) =>{
    const requestURL = `${SB_PRE_URL}/getResume`;
    return async(dispath,getState) =>{
        const result = await fetch(requestURL , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(info)
        }).then(resp => resp.json());
        if(result.status === 200)
        {
            result.data = Object.assign({}, result.data,{"resumeCode" : info.resumeCode});
            dispath(postResume(result));
            return {status : result.status}
        }
    }
}


export const callModifyResumeAPI = (form , index) => {
    const requestURL = `${SB_PRE_URL}/modifyResume`;
    return async(dispath , getState) =>{
        const result = await fetch(requestURL,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(form)
        }).then(resp => resp.json());
        if(result.status === 200){
            console.log(result)
            result.data = Object.assign({}, result.data,{"index" : index});
            result.data = Object.assign({}, result.data,{"skille" : form.skill});
            result.data = Object.assign({}, result.data,{"eligibility" : form.eligibility});
            dispath(postModify(result));
            return {status : result.status}
        }
    }
}
 export const callImageToPdfAPI = (form) =>{
    const requestURL = `${SB_PRE_URL}/saveResume`;
    console.log(form.get('title'))
    console.log(form.get('pdf'))
    console.log(form.get('memberId'))
    return async(dispath , getState) =>{
        const result = await fetch(requestURL,{
            method : 'POST',
            // headers : {
            //     "Content-Type" : "multipart/form-data"
            // },
            body : form
        }).then(resp => resp.json());
        if(result.status === 200){
           dispath(postNew(result));
           return {status : result.status}
        }
    }
    
}

export const callPostingSearch = (search) =>{
    const requestURL = `${SB_PRE_URL}/search/${search}`;
    return async(dispath , getState) => {
        const result = await fetch(requestURL).then(resp => resp.json());
        if(result.status === 200){
            dispath(getPostings(result));
            return { status : result.status};
        }
    }
}

export const callGetEligibility = (content) =>{
    const requestURL = `${FAST_PRE_URL}/getContent?content=${content}`
    return async(dispath , getState) =>{
        const result = await fetch(requestURL).then(resp => resp.json());
        dispath(getContent(result));
    }
}