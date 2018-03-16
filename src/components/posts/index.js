import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

class PostSection extends PureComponent {
  handleSubmit = e => {
    e.preventDefault()
    this.props
      .addPost({ text: this.input.value })
      .then(res => console.log('add post:', res))
      .catch(error => console.log(error.graphQLErrors.map(x => x.message)))
    this.form.reset()
  }

  render() {
    const { data: { error, loading, allPosts = [] } } = this.props

    if (error) return <div>{error.graphQLErrors.map(x => x.message)}</div>

    if (loading) return <div>loading...</div>

    return (
      <div>
        <PostList posts={allPosts} />
        <form onSubmit={this.handleSubmit} ref={el => (this.form = el)}>
          <input type="text" ref={el => (this.input = el)} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const PostList = ({ posts }) => (
  <ul>{posts.map(i => <PostItem key={i.id} item={i} />)}</ul>
)

const PostItem = ({ item }) => <li>{item.text}</li>

const FETCH_POSTS = gql`
  query Query {
    allPosts {
      id
      text
    }
  }
`

const ADD_POST = gql`
  mutation addPost($text: String!) {
    addPost(text: $text) {
      id
      text
    }
  }
`

export default compose(
  graphql(FETCH_POSTS),
  graphql(ADD_POST, {
    props: ({ ownProps, mutate }) => ({
      addPost: ({ text }) =>
        mutate({
          mutation: ADD_POST,
          variables: { text },
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              id: null,
              text,
            },
          },
          update: (proxy, { data: { addPost } }) => {
            const data = proxy.readQuery({ query: FETCH_POSTS })
            data.allPosts.push(addPost)
            proxy.writeQuery({ query: FETCH_POSTS, data })
          },
        }),
    }),
  })
)(PostSection)
