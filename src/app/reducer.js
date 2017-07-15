import { combineReducers } from 'redux'

import client from '../client'

// List of app reducers
import { reducer as authReducer } from '../auth/reducer'

export const reducer = combineReducers({
  apollo: client.reducer(),
  auth: authReducer
})
