import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const POST_COMPANY = 'COMPANY/POST_COMPANY';
export const GET_JOBLISTING = 'JOBLISTING/GET_JOBLISTING';
export const PUT_UPDATELIKE = 'COMPANY/PUT_UPDATELIKE';
export const GET_UPDATELIKE = 'COMPANY/GET_UPDATELIKE';


const actions = createActions({
    [POST_COMPANY]: () => {},
    [GET_JOBLISTING]: () => {},
    [PUT_UPDATELIKE]: () => {},
    [GET_UPDATELIKE]: () => {},
    

})

// 리듀서
const companyReducer = handleActions(
    {  // 해당 액션 함수의 상태 변화 값 저장
        [POST_COMPANY]: (state, { payload }) => ({postCompany : payload}),
        
        [GET_JOBLISTING] : (state, {payload }) => ({getJoblist : payload}),

        [PUT_UPDATELIKE]: (state, { payload }) => ({ putUpdalike: payload }),
        
        [GET_UPDATELIKE]: (state, { payload }) => ({ getLike: payload }),
    },
    initialState);

export default companyReducer;

