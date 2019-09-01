import { combineReducers } from 'redux'

import { auth }  from "./auth.reducer";
import { recommendations } from "./recommendation.reducer"
import { topics } from "./topic.reducer"

const rootReducer = combineReducers({
    auth,            // state.auth
    recommendations, // state.recommendations
    topics           // state.topics
})

export default rootReducer