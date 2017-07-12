import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'

import AuthService from './service'
import { logout, setProfile } from './actions'

/*
  This whole component is focused around two things.

  1) We make sure the user is logged in and if they're
     not redirect them to the login page (gating)
  2) We load the user profile for the currently logged
     in user and dispatch it to our local redux store
 */
class Auth extends Component {
  /*
    When the user clicks the login button we dispatch
    an action to our store to remove the token from
    local storage and refresh the browser (reset the
    state)
   */
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  componentWillMount () {
    /*
      Since we're using withApollo() for this component
      and not the traditional graphql() function we have
      access to the ApolloClient instance directly.

      This allows us to run a specific query at will. In
      this case when the component is about to mount we
      will request the user information from GraphCool
      and dispatch an action with that info to our local
      redux store.

      Remember query() and mutate() return JS promises
      which expose a .then() function for successful
      results and a .catch() function for errors
     */
    this.props.client.query({
      query: AuthService.getLoggedInUser
    }).then((resp) => {
      this.props.dispatch(setProfile(resp.data.user))
    }).catch((error) => {
      console.error(error)
    })
  }

  render () {
    /*
      If there isn't a token set in our store we don't
      have a logged in user. Redirect them back to /login
      using react-router-dom's <Redirect> component
     */
    if (this.props.token === null) {
      return <Redirect to="/login"/>
    }

    /*
      This will show the users name when we get a
      response back from the query we're calling in
      componentWillMount() and that result goes through
      the reducer populating userInfo in our authState
     */
    let userName = <span>Loading user profile</span>
    if (this.props.userInfo !== null) {
      userName = <span>{this.props.userInfo.profile.name}</span>
    }

    return (
      <Container className="auth-container mt-4">
        <Row>
          <Col>
            <p>You've been authenticated: {userName}</p>
            <Button type="button" color="primary" onClick={this.handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

Auth.propTypes = {
  userInfo: PropTypes.object,
  token: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    token: state.auth.token
  }
}

const withApolloClient = withApollo(Auth)
const withReduxConnection = connect(mapStateToProps)(withApolloClient)

export default withReduxConnection
