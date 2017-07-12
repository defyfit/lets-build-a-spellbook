import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'

import { logout } from './actions'

class Auth extends Component {
  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render () {
    if (this.props.token === null) {
      return <Redirect to="/login"/>
    }

    return (
      <Container className="auth-container mt-4">
        <Row>
          <Col>
            <p>You've been authenticated: {this.props.profile.name}</p>
            <Button type="button" color="primary" onClick={this.handleLogout}>Logout</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

Auth.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(Auth)
