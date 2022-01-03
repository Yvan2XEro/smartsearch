import moment from "moment";
import { LOAD_DOCS_ACTION, SAVE_DOC_ACTION } from ".";
import { DOCS_KEY } from "../../containers/SavedDocuments";
import { localStorage, pushSearchResultsIfNotExists } from "../../services";

export const saveDocAction = (doc: any) => async (dispatch: any) => {
    const docsStr = await localStorage.get(DOCS_KEY);
    let docs = [];
    if (docsStr != '') {
    docs = JSON.parse(docsStr);
    }
    const data = {
        data: doc,
        createdAt: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
    }
    pushSearchResultsIfNotExists(docs, data);

    await localStorage.set(DOCS_KEY, JSON.stringify(docs));
    return dispatch({
        type: SAVE_DOC_ACTION,
        payload: data
    })
}

export const loadDocsAction = () => async(dispatch: any) => {
    const docsStr = await localStorage.get(DOCS_KEY);
    return dispatch({
        type: LOAD_DOCS_ACTION,
        payload: JSON.parse(docsStr)
    })
}