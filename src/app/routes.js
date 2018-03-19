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

const Account = Loadable({
  loader: () => import('../pages/account'),
  loading: Loading,
})

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/account" component={Account} />
    <Route component={NotFound} />
  </Switch>
)
