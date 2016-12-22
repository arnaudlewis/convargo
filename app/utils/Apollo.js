

import React from 'react';
import { RouterContext } from 'react-router';

import { global } from '../global';

import ApolloClient, { addTypename, createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

function createClient(options) {
  return new ApolloClient(Object.assign({}, {
    queryTransformer: addTypename,
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
    },
    // shouldBatch: true,
  }, options));
}

function build(headers) {
  return createClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: global.apiEndpoint,
      opts: {
        credentials: 'same-origin',
        headers,
      },
    }),
  });
}

function makeProvider(client, renderProps) {
  return (
    <ApolloProvider client={client}>
      <RouterContext {...renderProps} />
    </ApolloProvider>
  );
}

export default { build, makeProvider, createClient };
