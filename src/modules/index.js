import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";
import authReducer from "../pages/login/authReducer";
import companyReducer from "./companyModules";
import chatbotReducer from "./chatbotModules";

const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
    auth: authReducer,
    companyReducer,
    chatbotReducer : chatbotReducer,
})


export default rootReducer

