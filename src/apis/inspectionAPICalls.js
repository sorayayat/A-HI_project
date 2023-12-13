import { postAsk } from "../modules/inspectionModule";

const FAST_SERVER_IP = `${process.env.FAST_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.FAST_SERVER_PORT}`;
const FAST_PRE_URL = `http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/inspection`;

export const callInspectionAskAPI = (formDate) =>{
    const requestURL = `${FAST_PRE_URL}`;
    console.log(formDate)

    // return async (dispatch,getState) =>{
        
    // }
}