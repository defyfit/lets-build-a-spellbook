import 'bootstrap/dist/css/bootstrap.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'
import registerServiceWorker from './registerServiceWorker'

import client from './client'
import store from './store'

/*
 Here we pass in the store and client to the ApolloProvider
 in order to make it so the children under it gain access
 to it's props

 We also wrap <App/> in react-router-dom's browser router
 which is the main parent for our routing functionality

 Without these two pieces we wouldn't have any Apollo or
 ReactRouter functionality
*/
ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
