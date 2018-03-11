import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Me from '../components/accounts/me'

const Account = () => (
  <Wrapper>
    <Helmet>
      <title>Account</title>
    </Helmet>
    <h1>Account</h1>
    <Link to="/">Home</Link>
    <hr />
    <Me />
  </Wrapper>
)

const Wrapper = styled.div`
  color: #2ecc40;
`

export default Account
