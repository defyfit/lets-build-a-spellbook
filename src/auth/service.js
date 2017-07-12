import { gql } from 'react-apollo'

class AuthService {
  loginUser = gql`
    mutation($email: String!, $password: String!) {
      signinUser(email: {
        email: $email,
        password: $password
      }) {
        token
      }
    }
  `
}

export default new AuthService()
