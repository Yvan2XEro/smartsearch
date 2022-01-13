import { UPDATE_USER_ACTION } from ".";
import { StoreAction } from "../../types";


export const updateUserAction = (user: any): StoreAction => ({payload:user, type: UPDATE_USER_ACTION})