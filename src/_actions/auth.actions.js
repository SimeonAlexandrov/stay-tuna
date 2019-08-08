import { authConstants } from '../_constants'
import { AsyncStorage } from "react-native"

export const authActions = {
    login,
    logout,
    register,
    checkTokenInStorage
}

function login(username, password, history) {
    return dispatch => {
        dispatch(request())

        // async
        // TODO Implement async call to authentication endpoint
    }

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(err) { return { type: authConstants.LOGIN_FAILURE, err } }
}

function logout(history) {
    // TODO Implement logout
    return { type: authConstants.LOGOUT }
}

function register(account, history) {
    return dispatch => {
        dispatch(request())
        console.log("Dispatching register action...")
        // async
        storageTest()
        // TODO Implement register call
        // authService.registerWithRole(account)
        // .then(() => {
        //     dispatch(success())
        //     history.push('/login')
        //     dispatch(alertActions.success('Registration successful. Please check your email for a verification link.'))
        // })
        // .catch(err => {
        //     dispatch(failure(err))
        //     dispatch(alertActions.error(err))
        // })
    }

    function request() { return { type: authConstants.REGISTER_REQUEST } }
    function success() { return { type: authConstants.REGISTER_SUCCESS } }
    function failure(err) { return { type: authConstants.REGISTER_FAILURE, err } }
}

// AsyncStorage works in web!
async function storageTest() {
    console.log("Async setting item")
    try {
        const response = await AsyncStorage.setItem("asdf", "test")
        console.log(response)
    } catch(err) { 
        console.error("Error while using AsyncStorage", err)
    }
}

async function checkTokenInStorage() {
    return dispatch => {
        dispatch(request())

        // async
        // TODO Implement async call to authentication endpoint
    }

    function request() { return { type: authConstants.CHECK_TOKEN_REQUEST } }
    function success(user) { return { type: authConstants.CHECK_TOKEN_SUCCESS, user } }
    function failure(err) { return { type: authConstants.CHECK_TOKEN_FAILURE, err } }
}