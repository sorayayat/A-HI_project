import {POST_COMPANY , GET_JOBLISTING} from '../modules/companyModules'


const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;

const SPRING_SERVER_IP = `${process.env.REACT_APP_SPRING_APP_SERVER_IP}`;
const SPRING_SERVER_PORT = `${process.env.REACT_APP_SPRING_APP_SERVER_PORT}`;

const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/posting`
const SPRING_PRE_URL = `http://${SPRING_SERVER_IP}:${SPRING_SERVER_PORT}/posting`


export const callPostingAPI = ({ form, companyCode }) => {

    const requestURL = `${SPRING_PRE_URL}/regist/${companyCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            body: form,
        }).then(response => response.json());

        console.log(result, "gd");

        if (result.message === "Success") {
            
            alert("공고 등록 완료");

            dispatch({ type: POST_COMPANY, payload: result });
        } else {
            // 그 외의 경우 실패
            alert("공고 등록 실패");
        }
        
    };
};

export const callSelectJobListing = () => {


    const requestURL = `${SPRING_PRE_URL}/jobListing`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            
        }).then(response => response.json());

        console.log(result, "gd");
        dispatch({ type: GET_JOBLISTING, payload: result });

        
    };
};




