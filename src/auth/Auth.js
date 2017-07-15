import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

import { logout, getAuthUser } from './actions'

class Auth extends Component {
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  componentWillMount () {
    this.props.dispatch(getAuthUser())
  }

  render () {
    if (this.props.token === null) {
      return <Redirect to="/login"/>
    }

    const name = (this.props.userInfo !== null) ? this.props.userInfo.profile.name : null

    return (
      <div>
        <h1>Welcome {name}</h1>
        <Button color="primary" onClick={this.handleLogout}>Logout</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.profile,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(Auth)
