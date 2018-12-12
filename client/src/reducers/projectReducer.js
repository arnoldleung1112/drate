import { GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "../actions/type";

const initialState = {
    projects: [], 
    project: {},
    errors:{}
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_PROJECTS:
            return{
                ...state,
                projects:action.payload
            }
        case GET_PROJECT:
            return{
                ...state,
                project: action.payload
            }
        default:
            return state
    }
}