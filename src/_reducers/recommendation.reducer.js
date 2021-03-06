import { recommendationConstants } from "../_constants"

/**
 * State
 * {
 *   ...
 *   recommendations: { recommendations: [], loading: false, buttonLoading: false }
 *   ...
 * }
 */

export function recommendations(state = { loading: false, buttonLoading: false, recommendations: [] }, action) {
    switch(action.type) {
        case recommendationConstants.GET_RECOMMENDATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case recommendationConstants.GET_RECOMMENDATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                recommendations: action.recommendations
            }
        case recommendationConstants.GET_RECOMMENDATIONS_FAILURE: 
            return {
                ...state,
                loading: false
            }
        case recommendationConstants.POST_RECOMMENDATIONS_REQUEST:
            return {
                ...state,
                buttonLoading: true,
            }
        case recommendationConstants.POST_RECOMMENDATIONS_SUCCESS:
            return {
                ...state,
                buttonLoading: false,
            }
        case recommendationConstants.POST_RECOMMENDATIONS_FAILURE: 
            return {
                ...state,
                buttonLoading: false,
            }

        case recommendationConstants.PUT_RECOMMENDATIONS_REQUEST:
            return {
                ...state,
            }
        case recommendationConstants.PUT_RECOMMENDATIONS_SUCCESS:
            return {
                ...state,
            }
        case recommendationConstants.PUT_RECOMMENDATIONS_FAILURE: 
            return {
                ...state,
            }
        default:
            return state
    }
}