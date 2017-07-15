import './SignUp.css'
import React, { Component } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBlock, Alert } from 'reactstrap'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import AuthService from './service'
import SignUpForm from './SignUpForm'
import { signUp, signUpFail, signUpSuccess } from './actions'

class SignUp extends Component {
  handleSignUpAttempt = (userInfo) => {
    this.props.dispatch(signUp())

    this.props.mutate({
      variables: userInfo
    }).then((resp) => {
      this.props.dispatch(signUpSuccess())
    }).catch((err) => {
      this.props.dispatch(signUpFail(err.message))
    })
  }

  render () {
    if (this.props.token !== null) {
      return <Redirect to="/app"/>
    }

    if (this.props.justSignedUp) {
      return <Redirect to="/login"/>
    }

    let failedSignUp = null
    if (this.props.signUpError !== null) {
      failedSignUp = <Alert color="danger">{this.props.signUpError}</Alert>
    }

    return (
      <Container className="login-container">
        <Row>
          <Col>
            <Card className="mt-4">
              <CardHeader>Sign Up</CardHeader>
              <CardBlock>
                {failedSignUp}
                <SignUpForm onSubmit={this.handleSignUpAttempt} loading={false}/>
                <p className="mb-0 pt-4 text-center">
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

const mapStateToProps = (state) => {
  return {
    signUpError: state.auth.signUpError,
    loading: state.auth.loading,
    justSignedUp: state.auth.justSignedUp,
    token: state.auth.token
  }
}

const withSignUpMutation = graphql(AuthService.signUpUser)(SignUp)

/*
 <GraphQL>
 <SignUp>
 </GraphQL>
 */

const withReduxState = connect(mapStateToProps)(withSignUpMutation)

/*
 <Connect>
 <GraphQL>
 <SignUp>
 </GraphQL>
 </Connect>
 */

export default withReduxState
