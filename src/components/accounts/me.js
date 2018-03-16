import React from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

import SignupForm from './signup'
import LoginForm from './login'

const Me = ({ data, client }) => {
  const { error, loading, me } = data
  if (error)
    return (
      <div>
        {error.graphQLErrors.map(x => x.message)}
        <br />
        <SignupForm fetchMe={() => data.refetch()} />
        <LoginForm fetchMe={() => data.refetch()} />
      </div>
    )
  if (loading) return <div>loading...</div>
  const username = me && me.username
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

const FETCH_ME = gql`
  query Query {
    me {
      username
    }
  }
`

export default graphql(FETCH_ME)(withApollo(Me))
