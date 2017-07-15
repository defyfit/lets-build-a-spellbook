import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import client from './client'
import { reducer } from './app/reducer'

// Import our sagas
import authSaga from './auth/saga'

const sagaMiddleware = createSagaMiddleware()

export default createStore(reducer, {}, compose(
  applyMiddleware(client.middleware()),
  applyMiddleware(sagaMiddleware),
  (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

sagaMiddleware.run(authSaga)
