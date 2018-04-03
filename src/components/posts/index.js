import React, { createRef } from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

const FETCH_POSTS = gql`
  query Query {
    allPosts {
      id
      text
    }
  }
`

const PostList = () => (
  <Query query={FETCH_POSTS}>
    {({ loading, error, data }) => {
      if (error) return <div>{error.graphQLErrors.map(x => x.message)}</div>
      if (loading) return <div>loading...</div>
      return <ul>{data.allPosts.map(i => <PostItem key={i.id} item={i} />)}</ul>
    }}
  </Query>
)

const PostItem = ({ item }) => <li>{item.text}</li>

const ADD_POST = gql`
  mutation addPost($text: String!) {
    addPost(text: $text) {
      id
      text
    }
  }
`

const PostForm = () => (
  <Mutation
    mutation={ADD_POST}
    update={(cache, { data: { addPost } }) => {
      const { allPosts } = cache.readQuery({ query: FETCH_POSTS })
      cache.writeQuery({
        query: FETCH_POSTS,
        data: { allPosts: allPosts.concat([addPost]) },
      })
    }}
  >
    {addPost => {
      const form = createRef()
      const input = createRef()
      const handleSubmit = e => {
        e.preventDefault()
        addPost({ variables: { text: input.current.value } })
          .then(res => console.log('add post:', res))
          .catch(error => console.log(error.graphQLErrors.map(x => x.message)))
        form.current.reset()
      }

      return (
        <form onSubmit={handleSubmit} ref={form}>
          <input type="text" ref={input} />
          <input type="submit" />
        </form>
      )
    }}
  </Mutation>
)

export default () => (
  <>
    <PostList />
    <PostForm />
  </>
)
