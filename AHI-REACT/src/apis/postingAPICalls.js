import {POST_COMPANY , GET_JOBLISTING , PUT_UPDATELIKE, GET_UPDATELIKE ,GET_SEARCHCOMPANY , GET_SEARCHNAME , DELETE_POSTING , GET_COMPANYTLOGO} from '../modules/companyModules'
import Swal from 'sweetalert2';

const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;


const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;

const SPRING_SERVER_IP = `${process.env.REACT_APP_SPRING_APP_SERVER_IP}`;
const SPRING_SERVER_PORT = `${process.env.REACT_APP_SPRING_APP_SERVER_PORT}`;

const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/posting`
const SPRING_PRE_URL = `http://${SPRING_SERVER_IP}:${SPRING_SERVER_PORT}/posting`



export const callPostingAPI = ({ form, companyCode , navigate }) => {


    const requestURL = `${SPRING_PRE_URL}/regist/${companyCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            body: form,
        }).then(response => response.json());

        

        if (result.message === "success") {
            
            alert("공고 등록 완료");

            dispatch({ type: POST_COMPANY, payload: result });
            navigate('/companyList')
        } else {
            // 그 외의 경우 실패
            alert("공고 등록 실패");
        }
        
    };
};

export const callSelectJobListing = ({currentPage}) => {

    console.log(currentPage , "??");

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `${SPRING_PRE_URL}/jobListing/${currentPage}`;
    }else {
        requestURL = `${SPRING_PRE_URL}/jobListing`;
    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            
        }).then(response => response.json());

        console.log(result , "gdg");

        
        dispatch({ type: GET_JOBLISTING, payload: result });

        
    };
};

export const callUpdatePostingLike = ({memberCode , postingCode}) => {

    


    const requestURL = `${SPRING_PRE_URL}/updateLike/${memberCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postingCode }), 
        }).then(response => response.json());


        
        dispatch({ type: PUT_UPDATELIKE, payload: result });

        
    };
};

export const callGetLikeState = ({memberCode , postingCode}) => {


    const requestURL = `${SPRING_PRE_URL}/getLike/${memberCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postingCode }), 
        }).then(response => response.json()); 
        
        dispatch({ type: GET_UPDATELIKE, payload: result });

        
    };
};

export const callSearchCompany = () => {


    const requestURL = `${SPRING_PRE_URL}/searchPage`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',

            
        }).then(response => response.json());

        console.log(result , "??");
        
        
        dispatch({ type: GET_SEARCHCOMPANY, payload: result });

        
    };
};


export const callCompanyNameSearch = ({searchName}) => {


    const requestURL = `${SPRING_PRE_URL}/${searchName}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',

            
        }).then(response => response.json());
        
        dispatch({ type: GET_SEARCHNAME, payload: result });

        
    };
};

export const callDeletePosting = ({postingCode}) => {


    const requestURL = `${SPRING_PRE_URL}/delete/${postingCode}`;

    

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',

            
        }).then(response => response.json());

        
        dispatch({ type: DELETE_POSTING, payload: result });

        
    };
};

export const callGetCompanyLogo = () => {


    const requestURL = `${SPRING_PRE_URL}/companyLogo`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',

            
        }).then(response => response.json());


        
        dispatch({ type: GET_COMPANYTLOGO, payload: result });

        
    };
};









