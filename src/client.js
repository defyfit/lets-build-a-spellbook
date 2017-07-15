import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj518rjxeojpk0175g6viptg9'
})

networkInterface.use([
  {
    applyMiddleware: (req, next) => {
      if (req.options.headers === undefined) {
        req.options.headers = {}
      }

      const token = localStorage.getItem('token')

      req.options.headers.Authorization = (token) ? `Bearer ${token}` : null
      next()
    }
  }
])

export default new ApolloClient({
  networkInterface
})
