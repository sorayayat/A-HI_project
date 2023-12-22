import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const POST_COMPANY = 'COMPANY/POST_COMPANY';
export const GET_JOBLISTING = 'JOBLISTING/GET_JOBLISTING'

const actions = createActions({
    [POST_COMPANY]: () => {},
    [GET_JOBLISTING]: () => {},

})

// 리듀서
const companyReducer = handleActions(
    {  // 해당 액션 함수의 상태 변화 값 저장
        [POST_COMPANY]: (state, { payload }) => {

            return payload
        },
        
        [GET_JOBLISTING] : (state, {payload }) => {

            return payload
        }
    },
    initialState);

export default companyReducer;

