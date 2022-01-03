import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import docsReducer from "./docs";


export default createStore(combineReducers({
    docs:docsReducer
}), applyMiddleware(thunk))
