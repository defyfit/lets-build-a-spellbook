import './Login.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Card, CardHeader, CardBlock, Alert } from 'reactstrap'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AuthService from './service'
import { login, loginSuccess, loginError } from './actions'
import LoginForm from './LoginForm'

class Login extends Component {
  handleLoginAttempt = (data) => {
    this.props.dispatch(login())

    this.props.mutate({
      variables: data
    }).then((response) => {
      this.props.dispatch(loginSuccess(response.data.signinUser))
    }).catch((error) => {
      this.props.dispatch(loginError(error.message))
    })
  }

  render () {
    let errorMessage = null
    if (this.props.error !== null) {
      errorMessage = <Alert color="danger">{this.props.error}</Alert>
    }

    if (this.props.token !== null) {
      return <Redirect to="/app"/>
    }

    return (
      <Container className="login-container">
        <Row>
          <Col>
            <Card>
              <CardHeader>Login</CardHeader>
              <CardBlock>
                {errorMessage}
                <LoginForm loading={this.props.loggingIn} onSubmit={this.handleLoginAttempt}/>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

Login.propTypes = {
  error: PropTypes.string,
  loggingIn: PropTypes.bool.isRequired,
  token: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loggingIn: state.auth.loggingIn,
    token: state.auth.token
  }
}

const withLoginUserMutation = graphql(AuthService.loginUser)(Login)
const withReduxConnection = connect(mapStateToProps)(withLoginUserMutation)

export default withReduxConnection
