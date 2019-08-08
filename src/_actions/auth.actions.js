import { AsyncStorage } from "react-native"
import axios from "axios"

import { authConstants, API_BASE } from '../_constants'



export const authActions = {
    login,
    logout,
    register,
    checkTokenInStorage
}

function login({ username, password }, navigation) {
    return async dispatch => {
        dispatch(request())

        try {
            const response = await axios.post(`${API_BASE}/api/users/login`, {
                username,
                password
            })
            if (response.status !== 200) {
                throw new Error("Login failed")
            }
            console.log(response.data)
            await AsyncStorage.setItem("user", JSON.stringify(response.data.data))
            navigation.navigate("App")
            dispatch(success(response.user))

        } catch (err) {
            console.error(err)
            dispatch(failure(err))
        }
    } 

    function request() { return { type: authConstants.LOGIN_REQUEST } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(err) { return { type: authConstants.LOGIN_FAILURE, err } }
}

function logout(navigation) {
   return async dispatch => {
    
        dispatch(request())

        try {
            const token = JSON.parse(await AsyncStorage.getItem("user")).token

            const response = await axios.post(`${API_BASE}/api/users/me/logout`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                throw new Error("Logout failed")
            }

            await AsyncStorage.removeItem("user")
            navigation.navigate("Auth")
            dispatch(success())
        } catch (err) {
            console.error(err)
            dispatch(failure(err))
        }
   }

   function request() { return { type: authConstants.LOGOUT_REQUEST } }
    function success() { return { type: authConstants.LOGOUT_SUCCESS } }
    function failure(err) { return { type: authConstants.LOGOUT_FAILURE, err } }
}

function register({ username, email, password }, navigation) {
    return async dispatch => {
        dispatch(request())
        
        try {
            const response = await axios.post(`${API_BASE}/api/users`, {
                username,
                email,
                password
            })
            if (response.status !== 201) {
                throw new Error("Registration has failed.")
            }
            navigation.navigate("Login")
            dispatch(success())
        } catch (err) {
            console.error(err)
            dispatch(failure())
        }
    }

    function request() { return { type: authConstants.REGISTER_REQUEST } }
    function success() { return { type: authConstants.REGISTER_SUCCESS } }
    function failure(err) { return { type: authConstants.REGISTER_FAILURE, err } }
}


function checkTokenInStorage(navigation) {
    return async dispatch => {
        dispatch(request())
        try {
            const user = await AsyncStorage.getItem("user")
            let token
            if (user) {
                token = JSON.parse(user).token
            } else {
                throw new Error("No available token in storage")
            }

            // NOTE maybe this is not the best way to verify token
            const response = await axios.get(`${API_BASE}/api/users/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                throw new Error("Check token failed")
            }

            navigation.navigate("App")
            dispatch(success())
        } catch (err) {
            console.error(err)
            navigation.navigate("Auth")
            dispatch(failure(err))
        }
    }

    function request() { return { type: authConstants.CHECK_TOKEN_REQUEST } }
    function success(user) { return { type: authConstants.CHECK_TOKEN_SUCCESS, user } }
    function failure(err) { return { type: authConstants.CHECK_TOKEN_FAILURE, err } }
}