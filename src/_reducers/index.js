import { combineReducers } from 'redux'

import { auth }  from "./auth.reducer";

const rootReducer = combineReducers({
    auth    // state.auth
})

export default rootReducer