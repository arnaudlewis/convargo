import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'isomorphic-fetch';

import ClientRouter from './components/ClientRouter.jsx';

const client = new ApolloClient({
  initialState: window.__APOLLO_STATE__,
});

window.onload = () => {
  render((
    <ApolloProvider client={client}>
      <ClientRouter />
    </ApolloProvider>
  ), document.getElementById('content'));
};
