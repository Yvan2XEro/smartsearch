import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import docsReducer from "./docs";
import queriesResultsReducer from "./queriesResults";


export default createStore(combineReducers({
    docs:docsReducer,
    queriesResults: queriesResultsReducer
}), applyMiddleware(thunk))
