import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";

const rootReducer = combineReducers({
    inspectionReducer,
})


export default rootReducer

