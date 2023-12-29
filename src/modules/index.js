import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";
import companyReducer from "./companyModules";
import chatbotReducer from "./chatbotModules";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
    companyReducer,
    chatbotReducer
})

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist:  ["chatbotReducer"]
};



export default persistReducer(persistConfig, rootReducer);