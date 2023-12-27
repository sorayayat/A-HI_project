import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";
import authReducer from "../pages/login/authReducer";
import companyReducer from "./companyModules";
import chatbotReducer from "./chatbotModules";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
    auth: authReducer,
    companyReducer,
    chatbotReducer : chatbotReducer
})

const persistConfig = {
    key: "root",
    storage: storage,
};



export default persistReducer(persistConfig, rootReducer);
