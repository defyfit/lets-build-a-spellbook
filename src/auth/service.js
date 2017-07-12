import { gql } from 'react-apollo'

class AuthService {
  loginUser = gql`
    mutation($email: String!, $password: String!) {
      signinUser(email: {
        email: $email
        password: $password
      }) {
        token
      }
    }
  `

  registerUser = gql`
    mutation($email: String!, $password: String!, $name: String!) {
      createUser(
        profile: {
          name: $name
        }
        authProvider: {
          email: {
            email: $email
            password: $password
          }
        }
      ) {
        id
      }
    }
  `

  getLoggedInUser = gql`
    query {
      user {
        id
        email
        profile {
          name
        }
      }
    }
  `
}

export default new AuthService()
