import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./modules";

const store = createStore (
    rootReducer,
    applyMiddleware(thunk , logger)
)

export default store;