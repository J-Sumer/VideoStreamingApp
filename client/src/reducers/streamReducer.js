import _ from 'lodash';

import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types'



export default ( state={}, action) => {
    switch (action.type){
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id')} // mapkeys will map array to object (watch 255th video)
        case FETCH_STREAM:
            return { ...state, [action.payload.id] : action.payload};
        case CREATE_STREAM:
            return { ...state, [action.payload.id] : action.payload};
        case EDIT_STREAM:
            return { ...state, [action.payload.id] : action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload) // here its not action.payload.id, since in action/index for delete route we are dispatching id directly in payload 
            // omit will reutrn a new object
        default:
            return state;
    }

}