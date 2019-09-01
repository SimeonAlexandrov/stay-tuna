import axios from "axios"
import { AsyncStorage } from "react-native"

import { topicConstants } from '../_constants'
import { API_BASE } from "../index"

export const topicActions = {
    getTopics,
    postTopic,
}

function getTopics() {
    return async dispatch => {
        dispatch(request())

        try {
            const token = JSON.parse(await AsyncStorage.getItem("user")).token
            const response = await axios.get(`${API_BASE}/api/topics`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status !== 200) {
                throw new Error("Fetching topics failed")
            }
            dispatch(success(response.data.data.topics))
        } catch (err) {
            console.warn(err)
            dispatch(failure(err))
        }
    }

    function request() { return { type: topicConstants.GET_TOPICS_REQUEST } }
    function success(topics) { return { type: topicConstants.GET_TOPICS_SUCCESS, topics } }
    function failure(err) { return { type: topicConstants.GET_TOPICS_FAILURE, err } }
}

function postTopic() {}