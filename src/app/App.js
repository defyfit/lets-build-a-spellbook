import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import Auth from '../auth/Auth'

class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/sign-up" component={SignUp}/>
        <Route path="/app" component={Auth}/>
      </Switch>
    )
  }
}

export default App
