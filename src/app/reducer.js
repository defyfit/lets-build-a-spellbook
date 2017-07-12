import { combineReducers } from 'redux'

/*
  We also need to import the ApolloClient instance
  we created in this reducer so we can setup the
  reducer needed to make Apollo work with our
  custom store.
 */
import client from '../client'

import * as authReducer from '../auth/reducer'

/*
  A variable containing everything we need to initialize
  this piece of state that this reducer will control
 */
export const initialState = {
  // We don't initialize Apollo since it'll handle that for us
  auth: authReducer.initialState
}

/*
  Because this is the app reducer it essentially houses
  all the other reducers in the application that drive
  some sort of functionality.

  We can use the combineReducers function from redux
  in order to make a single rootReducer (appReducer)
  from the other smaller specific reducers.
 */
export const reducer = combineReducers({
  // The ApolloClient exposes a reducer function that returns the apollo reducer
  apollo: client.reducer(),
  auth: authReducer.reducer
})
