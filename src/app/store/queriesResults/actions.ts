import moment from 'moment';
import {
  DELETE_QUERY_RESULT_ACTION,
  LOAD_RESULTS_ACTION,
  SAVE_NEW_RESULT_ACTION,
} from '.';
import {localStorage, pushSearchResultsIfNotExists} from '../../services';

const getSavedQueries = async () =>
  JSON.parse(await localStorage.get('queries', JSON.stringify([])));
export const saveNewQueryResultAction =
  ({results, buildedQuery}: {results: any[], buildedQuery: string}) =>
  async (dispatch: any) => {
    let queries = await getSavedQueries();

    const data = {
      query: buildedQuery,
      name:
        buildedQuery +
        '_' +
        moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
      createdAt: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
      data: results,
    };
    if (pushSearchResultsIfNotExists(queries, data)) {
      await localStorage.set('queries', JSON.stringify(queries));
    }
    return dispatch({
      type: SAVE_NEW_RESULT_ACTION,
      payload: data,
    });
  };

export const deleteQueryResultAction =
  ({name}: any) =>
  async (dispatch: any) => {
    let queries = await getSavedQueries();
    const q = queries.filter((item: any) => item.name != name);
    localStorage.set('queries', JSON.stringify(q));
    return dispatch({
      type: DELETE_QUERY_RESULT_ACTION,
      payload: name,
    });
  };

export const loadResultsAction = () => async (dispatch: any) => {
  const results = await getSavedQueries();

  return dispatch({
    type: LOAD_RESULTS_ACTION,
    payload: results,
  });
};
