import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const POST_RECOMMENDATION = 'RECOMMENDATION/POST_RECOMMENDATION';


export const { recommendation: { postRecommendation } } = createActions({
    [POST_RECOMMENDATION]: res => res,
});

// 리듀서
const recommendationReducer = handleActions(
    {  // 해당 액션 함수의 상태 변화 값 저장
        [POST_RECOMMENDATION]: (state, { payload }) => { return payload }

    },
    initialState);

export default recommendationReducer;

