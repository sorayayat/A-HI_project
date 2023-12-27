import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const { postChatbot } = createActions({
  POST_CHATBOT: (payload) => payload
});


const chatbotReducer = handleActions(
  {
    [postChatbot]: (state, { payload }) => payload
  },
  initialState
);

export default chatbotReducer;
