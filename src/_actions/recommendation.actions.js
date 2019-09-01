import axios from "axios"
import { AsyncStorage } from "react-native"

import { recommendationConstants } from '../_constants'
import { API_BASE } from "../index"

export const recommendationActions = {
    getRecommendations,
    postRecommendation
}

function getRecommendations() {
    return async dispatch => {
        dispatch(request())

        try {
            const token = JSON.parse(await AsyncStorage.getItem("user")).token
            const response = await axios.get(`${API_BASE}/api/recommendations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error("Fetching recs failed")
            }
            dispatch(success(response.data.data.recommendations))
        } catch (err) {
            console.warn(err)
            dispatch(failure(err))
        }
    }

    function request() { return { type: recommendationConstants.GET_RECOMMENDATIONS_REQUEST } }
    function success(recommendations) { return { type: recommendationConstants.GET_RECOMMENDATIONS_SUCCESS, recommendations } }
    function failure(err) { return { type: recommendationConstants.GET_RECOMMENDATIONS_FAILURE, err } }
}

function postRecommendation () {
    return async dispatch => {
        dispatch(request())
        try {
            const token = JSON.parse(await AsyncStorage.getItem("user")).token
            const response = await axios.post(`${API_BASE}/api/recommendations`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error("Requesting rec failed")
            }
            dispatch(success())
            dispatch(getRecommendations())

        } catch(err) {
            console.warn(err)
            dispatch(failure)
        }
    }

    function request() { return { type: recommendationConstants.POST_RECOMMENDATIONS_REQUEST } }
    function success() { return { type: recommendationConstants.POST_RECOMMENDATIONS_SUCCESS } }
    function failure(err) { return { type: recommendationConstants.POST_RECOMMENDATIONS_FAILURE, err } }
}