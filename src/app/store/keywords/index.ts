import { StoreAction } from "../../types";

export const ADD_KEYWORD_ACTION = 'ADD_KEYWORD_ACTION'
export const DELETE_KEYWORD_ACTION = 'DELETE_KEYWORD_ACTION'
export const LOAD_KEYWORDS_ACTION = 'LOAD_KEYWORDS_ACTION'

export default function keywordsReducer(state: string[]=[], action:StoreAction) {
    switch (action.type) {
        case ADD_KEYWORD_ACTION:
            return [...state, action.payload]
        
        case DELETE_KEYWORD_ACTION:
            return state.filter(word =>word!==action.payload)
        
        case LOAD_KEYWORDS_ACTION:
            return action.payload
        
        default:
            return state
    }
}