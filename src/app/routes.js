import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => <div>Loading...</div>

const NotFound = Loadable({
  loader: () => import('../pages/404'),
  loading: Loading,
})

const Home = Loadable({
  loader: () => import('../pages/home'),
  loading: Loading,
})

const About = Loadable({
  loader: () => import('../pages/about'),
  loading: Loading,
})

const Signup = Loadable({
  loader: () => import('../pages/signup'),
  loading: Loading,
})

const Login = Loadable({
  loader: () => import('../pages/login'),
  loading: Loading,
})

// import NotFound from '../pages/404'
// import Home from '../pages/home'
// import About from '../pages/about'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route component={NotFound} />
  </Switch>
)
