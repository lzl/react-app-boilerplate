import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import client from './apollo'
import ClientRoutes from './routes'

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ClientRoutes />
    </BrowserRouter>
  </ApolloProvider>
)

export default hot(module)(App)
