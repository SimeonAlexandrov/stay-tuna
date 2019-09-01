import { combineReducers } from 'redux'

import { auth }  from "./auth.reducer";
import { recommendations } from "./recommendation.reducer"

const rootReducer = combineReducers({
    auth,           // state.auth
    recommendations // state.recommendations
})

export default rootReducer