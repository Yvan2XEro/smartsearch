import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import docsReducer from "./docs";
import loggedUserReducer from "./loggedUser";
import queriesResultsReducer from "./queriesResults";


const store = createStore(combineReducers({
    docs:docsReducer,
    queriesResults: queriesResultsReducer,
    loggedUser: loggedUserReducer
}), applyMiddleware(thunk))

export default store;
