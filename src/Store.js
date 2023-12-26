import { configureStore } from '@reduxjs/toolkit';
import chatbotReducer from './modules/chatbotModules';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState())); 
});

export default store;

