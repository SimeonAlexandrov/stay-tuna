import { authConstants } from '../_constants'

/**
 * State
 * {
 *   ...
 *   auth: { user: null, loading: false }
 *   ...
 * }
 */
export function auth(state = { loading: false, user: null }, action) {

    switch (action.type) {

        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                err: undefined,
            }

        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false,
                err: undefined,
            }

        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                err: action.err,
            }

        case authConstants.REGISTER_REQUEST:
            console.log("Modifing application state...")
            return {
                ...state,
                loading: true,
                err: undefined,
            }

        case authConstants.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                err: undefined,
            }

        case authConstants.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                err: action.err,
            }

        case authConstants.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
            }

        default:
            return state
    }

}