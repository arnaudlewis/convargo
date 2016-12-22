import React from 'react'
import { render } from 'react-dom'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Client } from 'subscriptions-transport-ws'
import { print } from 'graphql-tag/printer'
import 'isomorphic-fetch';

import ClientRouter from './components/ClientRouter.jsx'
import { global } from '../app/global'

import Apollo from '../app/utils/Apollo'

const client = new ApolloClient({
  initialState: window.__APOLLO_STATE__,
});

window.onload = () => {
  render((
    <ApolloProvider client={client}>
      <ClientRouter />
    </ApolloProvider>
  ), document.getElementById('content'))
}
