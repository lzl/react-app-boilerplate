import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NotFound from '../pages/404'
import Home from '../pages/home'
import About from '../pages/about'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
)
