import { combineReducers } from "redux";
import inspectionReducer from "./inspectionModule";
import authReducer from "../pages/login/authReducer";

const rootReducer = combineReducers({
    inspectionReducer,
    auth: authReducer,
})


export default rootReducer

