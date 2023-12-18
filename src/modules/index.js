import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";
import companyReducer from "./companyModules";

const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
    companyReducer,
})


export default rootReducer

