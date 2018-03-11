import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LoginForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault()
    const username = this.username.value
    const password = this.password.value
    this.props
      .login({ username, password })
      .then(() => this.props.fetchMe())
      .catch(error => console.log(error.graphQLErrors.map(x => x.message)))
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
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

const login = gql`
  mutation login($username: String!, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`

export default graphql(login, {
  props: ({ ownProps, mutate }) => ({
    login: ({ username, password }) =>
      mutate({
        variables: { username, password },
        update: (proxy, { data: { login } }) => {
          const { token } = login
          if (token) localStorage.setItem('auth-token', `Bearer ${token}`)
        },
      }),
  }),
})(LoginForm)
