import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { loadFromLocalStorage, saveToLocalStorage } from './pages/login/loginLocal';
import rootReducer from "./modules";




const persistedState = loadFromLocalStorage();
const store = createStore (
    rootReducer,
    applyMiddleware(thunk , logger)
)
    persistedState
)




store.subscribe(() => {
    saveToLocalStorage(store.getState());
});




export default store;