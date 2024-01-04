import { createActions, handleActions } from 'redux-actions';

const initialState = [];

// 요청 API
const POST_ASK = "inspection/POST_ASK" ;
const GET_RESUMELIST = "inspection/GET_RESUMELIST";
const GET_RESUME = 'inspection/GET_RESUME';
const POST_MODIFY = 'inspection/POST_MODIFY';

// 액션 함수 정의
export const { inspection : {postAsk , getResumelist , getResume , postModify}} = createActions({
    [POST_ASK] : res => res,
    [GET_RESUMELIST] : res => res,
    [GET_RESUME] : res => res,
    [POST_MODIFY] : res => res,
});

// 정의된 액션 함수의 감지하여 상태 변화가 있을 경우 payload에 변화를 저장하여 액션 함수의 정의 된 변수에 값을 저장하는 함수
const inspectionReducer = handleActions({
    [POST_ASK] : (state,{ payload }) => ({ask : payload}),
    [GET_RESUMELIST] : (state , { payload }) => ({resumelist : payload}),
    [GET_RESUME] : (state , { payload }) => ({resume : payload}),
    [POST_MODIFY] : (state , { payload }) => ({...state , modify : payload })
    },initialState);

export default inspectionReducer;