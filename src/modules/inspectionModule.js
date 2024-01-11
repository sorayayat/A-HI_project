import { createActions, handleActions } from 'redux-actions';

const initialState = [];

// 요청 API
const POST_ASK = "inspection/POST_ASK" ;
const POST_RESUMELIST = "inspection/POST_RESUMELIST";
const POST_RESUME = 'inspection/POST_RESUME';
const POST_MODIFY = 'inspection/POST_MODIFY';
const POST_NEW = 'inspection/POST_NEW';
const GET_POSTINGS = 'inspection/GET_POSTINGS';


// 액션 함수 정의
export const { inspection : {postAsk , postResumelist , postResume , postModify , postNew , getPostings}} = createActions({
    [POST_ASK] : res => res,
    [POST_RESUMELIST] : res => res,
    [POST_RESUME] : res => res,
    [POST_MODIFY] : res => res,
    [POST_NEW] : res => res,
    [GET_POSTINGS] : res => res
});

// 정의된 액션 함수의 감지하여 상태 변화가 있을 경우 payload에 변화를 저장하여 액션 함수의 정의 된 변수에 값을 저장하는 함수
const inspectionReducer = handleActions({
    [POST_ASK] : (state,{ payload }) => ({ask : payload}),
    [POST_RESUMELIST] : (state , { payload }) => ({resumelist : payload}),
    [POST_RESUME] : (state , { payload }) => ({resume : payload}),
    [POST_MODIFY] : (state , { payload }) => ({...state , modify : payload }),
    [POST_NEW] : (state , {payload}) => ({...state , newResume : payload}),
    [GET_POSTINGS] : (state , {payload}) => ({...state , postings : payload}),
    },initialState);

export default inspectionReducer;