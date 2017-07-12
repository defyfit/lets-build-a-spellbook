import './SignUp.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Card, CardHeader, CardBlock, Alert } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import AuthService from './service'
import { signUp, signUpSuccess, signUpError } from './actions'
import SignUpForm from './SignUpForm'

class SignUp extends Component {
  handleRegistrationAttempt = (data) => {
    if (data.name === '' || data.email === '' || data.password === '') {
      return false
    }

    this.props.dispatch(signUp())

    this.props.mutate({
      variables: data
    }).then(() => {
      this.props.dispatch(signUpSuccess())
    }).catch((error) => {
      this.props.dispatch(signUpError(error.message))
    })
  }

  render () {
    if (this.props.token !== null) {
      return <Redirect to="/app"/>
    }

    if (this.props.signedUp) {
      return <Redirect to="/login"/>
    }

    let errorMessage = null
    if (this.props.error !== null) {
      errorMessage = <Alert color="danger">{this.props.error}</Alert>
    }

    return (
      <Container className="sign-up-container">
        <Row>
          <Col>
            <Card>
              <CardHeader>Sign Up</CardHeader>
              <CardBlock>
                {errorMessage}
                <SignUpForm loading={this.props.signingIn} onSubmit={this.handleRegistrationAttempt}/>
                <p className="text-center mb-0 mt-4">
                  <Link to="/login">Already have an account?</Link>
                </p>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

SignUp.propTypes = {
  error: PropTypes.string,
  signingIn: PropTypes.bool.isRequired,
  signedUp: PropTypes.bool.isRequired,
  token: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.signUpError,
    signingIn: state.auth.signingUp,
    signedUp: state.auth.signedUp,
    token: state.auth.token
  }
}

const withSignUpUserMutation = graphql(AuthService.registerUser)(SignUp)
const withReduxConnection = connect(mapStateToProps)(withSignUpUserMutation)

export default withReduxConnection
