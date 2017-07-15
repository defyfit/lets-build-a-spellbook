import { gql } from 'react-apollo'

class AuthService {
  loginUser = gql`
    mutation ($email: String!, $password: String!) {
      signinUser(
        email: {
          email: $email
          password: $password
        }
      ) {
        token
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

  signUpUser = gql`
    mutation ($email: String!, $password: String!, $name: String!) {
      createUser(
        authProvider: {
          email: {
            email: $email,
            password: $password
          }
        },
        profile: {
          name: $name
        }
      ) {
        id
      }
    }
  `
}

export default new AuthService()
