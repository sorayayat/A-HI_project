import { applyMiddleware, legacy_createStore as createStore } from "redux";

import rootReducer from "./modules";

const store = createStore (
    rootReducer,
)

export default store;