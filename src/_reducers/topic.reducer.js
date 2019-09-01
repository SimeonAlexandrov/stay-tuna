import { topicConstants } from "../_constants"

/**
 * State
 * {
 *   ...
 *   topics: { topics: [], loading: false }
 *   ...
 * }
 */

export function topics(state = { loading: false, topics: [] }, action) {
    switch(action.type) {
        case topicConstants.GET_TOPICS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case topicConstants.GET_TOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                topics: action.topics
            }
        case topicConstants.GET_TOPICS_FAILURE: 
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}