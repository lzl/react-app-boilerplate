import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

const Me = ({ data: { loading, me }, client }) => {
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
  } else {
    return (
      <div>
        <Link to="/signup">Sign up</Link> <Link to="/login">Login</Link>
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
