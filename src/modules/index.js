import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";
import authReducer from "../pages/login/authReducer";
import companyReducer from "./companyModules";

const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
    auth: authReducer,
    companyReducer,
})


export default rootReducer

