/* global window,document*/

import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'isomorphic-fetch';

import ClientRouter from './components/ClientRouter.jsx';
import { global } from '../app/global';

const client = new ApolloClient({
  initialState: window.__APOLLO_STATE__,
  networkInterface: createNetworkInterface({
    uri: global.apiEndpoint,
    opts: {
      credentials: 'same-origin',
    },
  }),
});

window.onload = () => {
  render((
    <ApolloProvider client={client}>
      <ClientRouter />
    </ApolloProvider>
  ), document.getElementById('content'));
};
