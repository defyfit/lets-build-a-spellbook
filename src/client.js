import { ApolloClient, createNetworkInterface } from 'react-apollo'

/*
  This contains the url we need in order to get info from graphql
*/
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj518rjxeojpk0175g6viptg9'
})

/*
  .use() is a function on the networkInterface we created above that lets use specify
  some specific functionality to happen before (middleware) the actual AJAX/network request is
  sent out.

  In this case we need to add a header for a request called Authorization that contains
  the token we got back from the signinUser mutation
*/
networkInterface.use([
  {
    applyMiddleware (req, next) {
      /*
        Headers get sent along with the request so that a server can interpret them. In this
        case we need to make sure we have a place to set our own headers to send to GraphCool
      */
      if (!req.options.headers) {
        req.options.headers = {}
      }

      /*
        We can use HTML5's localStorage to store pieces of information like a client side session.

        In this case we're going to get the piece of information (token) we've stored from the
        login process.
      */
      const token = localStorage.getItem('token')

      /*
        Finally we set the authorization header for the request options so that it is included
        when the request is sent to GraphCool
      */
      req.options.headers.authorization = (token) ? `Bearer ${token}` : null

      /*
        Because we're dealing with middleware this function needs to inform the networkInterface
        that it can continue loading other middleware. We call the next() function when we're
        ready to pass the torch
      */
      next()
    }
  }
])

/*
  Creates and exports a new ApolloClient that we can use to communicate with our graphql API
  based off of the URI we set in the networkInterface
*/
export default new ApolloClient({
  networkInterface
})
