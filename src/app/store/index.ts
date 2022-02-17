import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {detailSettingReucer} from './detailSetting';
import docsReducer from './docs';
import keywordsReducer from './keywords';
import loggedUserReducer from './loggedUser';
import queriesResultsReducer from './queriesResults';

const store = createStore(
  combineReducers({
    docs: docsReducer,
    queriesResults: queriesResultsReducer,
    loggedUser: loggedUserReducer,
    keywords: keywordsReducer,
    detailSettings: detailSettingReucer,
  }),
  applyMiddleware(thunk),
);

export default store;
