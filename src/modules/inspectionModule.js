import { createActions, handleActions } from 'redux-actions';

const initialState = [];

// 요청 API
const POST_ASK = "inspection/POST_ASK" 

// 액션 함수 정의
export const { inspection : {postAsk}} = createActions({
    [POST_ASK] : res => res.data
});

// 정의된 액션 함수의 감지하여 상태 변화가 있을 경우 payload에 변화를 저장하여 액션 함수의 정의 된 변수에 값을 저장하는 함수
const inspectionReducer = handleActions({
    [POST_ASK] : (state,{ payload }) => payload
},initialState);

export default inspectionReducer;