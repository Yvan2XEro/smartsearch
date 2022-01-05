import moment from "moment";
import { DELETE_DOC_ACTION, LOAD_DOCS_ACTION, SAVE_DOC_ACTION } from ".";
import { DOCS_KEY } from "../../containers/SavedDocuments";
import { localStorage, pushSearchResultsIfNotExists } from "../../services";

export const saveDocAction = (doc: any) => async (dispatch: any) => {
    const docsStr = await localStorage.get(DOCS_KEY, JSON.stringify([]));
    let docs = [];
    docs = JSON.parse(docsStr);
    const data = {
        data: doc,
        createdAt: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
    }

    if (pushSearchResultsIfNotExists(docs, data)) {
        await localStorage.set(DOCS_KEY, JSON.stringify(docs));
        return dispatch({
            type: SAVE_DOC_ACTION,
            payload: data
        })
    }
}

export const deleteDocAction = (doc: any) => async (dispatch: any) => {
    let docs = JSON.parse(await localStorage.get(DOCS_KEY, JSON.stringify([])));
    await localStorage.set(DOCS_KEY, JSON.stringify(docs.filter((d: any) => JSON.stringify(d.data)!=JSON.stringify(doc))))
    return dispatch({
        type: DELETE_DOC_ACTION,
        payload: doc
    })
}

export const loadDocsAction = () => async(dispatch: any) => {
    const docsStr = await localStorage.get(DOCS_KEY);
    return dispatch({
        type: LOAD_DOCS_ACTION,
        payload: JSON.parse(docsStr)
    })
}