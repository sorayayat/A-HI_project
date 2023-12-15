import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";
import authReducer from "../pages/login/authReducer";

const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
    auth: authReducer,
})


export default rootReducer

