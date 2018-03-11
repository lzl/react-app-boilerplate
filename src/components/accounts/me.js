import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

const Me = ({ data: { error, loading, me }, client }) => {
  if (error)
    return (
      <div>
        {error.graphQLErrors.map(x => x.message)}
        <br />
        <Link to="/signup">Sign up</Link>
        <br />
        <Link to="/login">Login</Link>
      </div>
    )
  if (loading) return <div>loading...</div>
  const username = me && me.username
  if (username) {
    return (
      <div>
        {username}{' '}
        <button
          onClick={() => {
            localStorage.removeItem('auth-token')
            client.resetStore()
          }}
        >
          Logout
        </button>
      </div>
    )
  }
}

const fetchMe = gql`
  query Query {
    me {
      username
    }
  }
`

export default graphql(fetchMe)(withApollo(Me))
