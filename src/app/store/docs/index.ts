import { DOCS_KEY } from "../../containers/SavedDocuments";
import { localStorage } from "../../services";

export type StoreAction = {
    type: string,
    payload: any
}

export const SAVE_DOC_ACTION = 'SAVE_DOC_ACTION'
export const DELE_DOC_ACTION = 'DELE_DOC_ACTION'
export const LOAD_DOCS_ACTION = 'LOAD_DOCS_ACTION'

export default function savedDocsReducer(state=[], action: StoreAction) {
    switch (action.type) {
        case LOAD_DOCS_ACTION:
            return action.payload

        case SAVE_DOC_ACTION:
            return [...state, action.payload]

        case DELE_DOC_ACTION:
            return state.filter(d=>d!=action.payload)

        default:
            return state;

    }
}