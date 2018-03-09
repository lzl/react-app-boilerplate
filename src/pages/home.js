import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Posts from '../components/posts'

const Home = () => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1>Home</h1>
    <Link to="/about">About</Link>
    <hr />
    <h2>Posts</h2>
    <Posts />
  </div>
)

export default Home
