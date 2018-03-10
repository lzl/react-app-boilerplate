import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class SignupForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault()
    const username = this.username.value
    const password = this.password.value
    this.props.signup({ username, password })
    this.form.reset()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} ref={el => (this.form = el)}>
          <input
            type="text"
            placeholder="Username"
            ref={el => (this.username = el)}
          />
          <input
            type="password"
            placeholder="Password"
            ref={el => (this.password = el)}
          />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    )
  }
}

const signup = gql`
  mutation signup($username: String!, $password: String) {
    signup(username: $username, password: $password) {
      token
    }
  }
`

export default graphql(signup, {
  props: ({ ownProps, mutate }) => ({
    signup: ({ username, password }) =>
      mutate({
        variables: { username, password },
        update: (proxy, { data: { signup } }) => {
          const { token } = signup
          if (token) localStorage.setItem('auth-token', `Bearer ${token}`)
        },
      }),
  }),
})(SignupForm)
