import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import interviewReduer from "./interviewModule";

const rootReducer = combineReducers({
    inspectionReducer,
    interviewReduer,
})


export default rootReducer

