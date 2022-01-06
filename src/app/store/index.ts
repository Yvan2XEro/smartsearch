import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import docsReducer from "./docs";
import queriesResultsReducer from "./queriesResults";


const store = createStore(combineReducers({
    docs:docsReducer,
    queriesResults: queriesResultsReducer
}), applyMiddleware(thunk))

export default store;
