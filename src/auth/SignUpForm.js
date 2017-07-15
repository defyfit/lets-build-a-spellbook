import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'

class SignUpForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  handleLoginSubmit = (evt) => {
    evt.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <Form onSubmit={this.handleLoginSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" id="email" required onChange={(evt) => this.setState({ email: evt.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" id="password" required onChange={(evt) => this.setState({ password: evt.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input type="text" id="name" required onChange={(evt) => this.setState({ name: evt.target.value })} />
        </FormGroup>
        <Button color="primary" block>Sign Up</Button>
      </Form>
    )
  }
}

SignUpForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SignUpForm
