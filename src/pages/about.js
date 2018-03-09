import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const About = () => (
  <Wrapper>
    <Helmet>
      <title>About</title>
    </Helmet>
    <h1>About</h1>
    <Link to="/">Home</Link>
  </Wrapper>
)

const Wrapper = styled.div`
  color: #2ecc40;
`

export default About
