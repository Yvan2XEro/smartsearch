import { StoreAction } from "../../type";

export const UPDATE_USER_ACTION = 'UPDATE_USER_ACTION'

const loggedUserReducer = (state=null, action:StoreAction) => {
    switch (action.type) {
        case UPDATE_USER_ACTION:
            return action.payload
        default:
            return state;
    }
}

export default loggedUserReducer