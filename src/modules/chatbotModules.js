import { createActions, handleActions } from "redux-actions";

export const { postChatbot } = createActions({
  POST_CHATBOT: (payload) => payload
});

const initialState = [];

const chatbotReducer = handleActions(
  {
    [postChatbot]: (state, { payload }) => payload
  },
  initialState
);

export default chatbotReducer;
