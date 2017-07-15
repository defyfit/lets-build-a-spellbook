import './Login.css'
import React, { Component } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBlock, Alert } from 'reactstrap'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import AuthService from './service'
import LoginForm from './LoginForm'
import { login, loginFail, loginSuccess } from './actions'

class Login extends Component {
  handleLoginAttempt = (credentials) => {
    this.props.dispatch(login())

    this.props.mutate({
      variables: credentials
    }).then((resp) => {
      this.props.dispatch(loginSuccess(resp.data.signinUser.token))
    }).catch((err) => {
      this.props.dispatch(loginFail(err.message))
    })
  }

  render () {
    if (this.props.token !== null) {
      return <Redirect to="/app"/>
    }

    let failedLogin = null
    if (this.props.loginError !== null) {
      failedLogin = <Alert color="danger">{this.props.loginError}</Alert>
    }

    let justSignedUp = null
    if (this.props.justSignedUp) {
      justSignedUp = <Alert color="success">Welcome! Please login now.</Alert>
    }

    return (
      <Container className="login-container">
        <Row>
          <Col>
            <Card className="mt-4">
              <CardHeader>Login</CardHeader>
              <CardBlock>
                {failedLogin}
                {justSignedUp}
                <LoginForm onSubmit={this.handleLoginAttempt} loading={false}/>
                <p className="mb-0 pt-4 text-center">
                  <Link to="/sign-up">Need an account?</Link>
                </p>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.auth.loginError,
    loginLoading: state.auth.loading,
    justSignedUp: state.auth.justSignedUp,
    token: state.auth.token
  }
}

const withLoginMutation = graphql(AuthService.loginUser)(Login)

/*
  <GraphQL>
    <Login>
  </GraphQL>
 */

const withReduxState = connect(mapStateToProps)(withLoginMutation)

/*
  <Connect>
   <GraphQL>
    <Login>
   </GraphQL>
  </Connect>
 */

export default withReduxState
