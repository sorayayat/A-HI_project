import { createActions ,  handleActions} from "redux-actions";

const initialState = [];

const GET_INTERVIEW = "interview/GET_INTERVIEW"; // 액션 함수 정의 

export const {interview : {getInterview}} = createActions({ // 액션함수 생성
    [GET_INTERVIEW] : res => res,
})

const interviewReduer = handleActions({  // 해당 액션 함수의 상태 변화 값 저장
    [GET_INTERVIEW] : (state, {payload}) => ({interview : payload})
},initialState);

export default interviewReduer;