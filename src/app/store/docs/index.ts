import {DOCS_KEY} from '../../containers/SavedDocuments';
import {localStorage} from '../../services';
import {StoreAction} from '../../types';

export const SAVE_DOC_ACTION = 'SAVE_DOC_ACTION';
export const DELETE_DOC_ACTION = 'DELETE_DOC_ACTION';
export const LOAD_DOCS_ACTION = 'LOAD_DOCS_ACTION';

export default function savedDocsReducer(state = [], action: StoreAction) {
  switch (action.type) {
    case LOAD_DOCS_ACTION:
      return action.payload;

    case SAVE_DOC_ACTION:
      return [...state, action.payload];

    case DELETE_DOC_ACTION:
      return state.filter((d: any) => d.data != action.payload);

    default:
      return state;
  }
}
