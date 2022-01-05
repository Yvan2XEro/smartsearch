import moment from "moment"
import { SAVE_NEW_RESULTS_ACTION } from "."

export const saveNewQueryResultAction = (results: any) => (dispatch:any) =>{
    return dispatch({
        type: SAVE_NEW_RESULTS_ACTION,
        payload: {
            createdAt: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
            data: results
        }
    })
}