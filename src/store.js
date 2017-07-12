import { createStore, applyMiddleware, compose } from 'redux'

/*
  Since Apollo, by default, uses it's own redux store we need to
  inform it to use our own local store.

  The ApolloClient we export from our client file has the middleware
  we need in order to make this happen.
 */
import client from './client'

// We import the root reducer and default state for the application
import { reducer, initialState } from './app/reducer'

export default createStore(
  reducer,
  initialState,
  /*
    The compose function allows us to specify multiple pieces
    of middleware (functions) that will be passed to Redux's
    createStore method.

    Without this function we'd only be able to specify one
    enhancer or piece of middleware.

    https://github.com/reactjs/redux/blob/master/docs/api/compose.md
   */
  compose(
    // The ApolloClient exposes a middleware function that returns Redux what it needs
    applyMiddleware(client.middleware()),
    // The below function lets us use those nifty devtools for redux
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)
