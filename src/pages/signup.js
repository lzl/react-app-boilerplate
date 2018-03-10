import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import SignupForm from '../components/accounts/signup'

const Signup = () => (
  <div>
    <Helmet>
      <title>Signup</title>
    </Helmet>
    <h1>Signup</h1>
    <Link to="/">Home</Link>
    <hr />
    <SignupForm />
  </div>
)

export default Signup
