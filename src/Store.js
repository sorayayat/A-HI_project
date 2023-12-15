import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { loadFromLocalStorage, saveToLocalStorage } from './pages/login/loginLocal';
import rootReducer from "./modules";




const persistedState = loadFromLocalStorage();
const store = createStore (
    rootReducer,
    persistedState
)




store.subscribe(() => {
    saveToLocalStorage(store.getState());
});




export default store;