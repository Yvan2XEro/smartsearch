import {StoreAction} from '../../types';

export const SAVE_NEW_RESULT_ACTION = 'SAVE_NEW_RESULT_ACTION';
export const LOAD_RESULTS_ACTION = 'LOAD_RESULTS_ACTION';
export const DELETE_QUERY_RESULT_ACTION = 'DELETE_QUERY_RESULT_ACTION';

const queriesResultReducer = (state = [], action: StoreAction) => {
  switch (action.type) {
    case SAVE_NEW_RESULT_ACTION:
      return [...state, action.payload];

    case DELETE_QUERY_RESULT_ACTION:
      return state.filter((qr: any) => qr.name != action.payload);
    case LOAD_RESULTS_ACTION:
      return action.payload;
    default:
      return state;
  }
};

export default queriesResultReducer;
