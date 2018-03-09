import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

class PostSection extends PureComponent {
  handleSubmit = e => {
    e.preventDefault()
    this.props.addPost({ text: this.input.value })
    this.form.reset()
  }

  render() {
    const { data: { loading, allPosts = [] } } = this.props

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

const fetchPosts = gql`
  query Query {
    allPosts {
      id
      text
    }
  }
`

const addPost = gql`
  mutation addPost($text: String!) {
    addPost(text: $text) {
      id
      text
    }
  }
`

export default compose(
  graphql(fetchPosts),
  graphql(addPost, {
    props: ({ ownProps, mutate }) => ({
      addPost: ({ text }) =>
        mutate({
          mutation: addPost,
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
            const data = proxy.readQuery({ query: fetchPosts })
            data.allPosts.push(addPost)
            proxy.writeQuery({ query: fetchPosts, data })
          },
        }),
    }),
  })
)(PostSection)
