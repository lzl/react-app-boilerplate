import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import LoginForm from '../components/accounts/login'

const Login = () => (
  <div>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <h1>Login</h1>
    <Link to="/">Home</Link>
    <hr />
    <LoginForm />
  </div>
)

export default Login
