import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloProvider } from '@apollo/react-hooks';
import AddName from './AddName';
import ManageNames from './ManageNames';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL
});

const wsLink = new WebSocketLink({
  uri: process.env.GRAPHQL_WS_URL,
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


function App() {

  return <ApolloProvider client={apolloClient}>
    <h1>Users</h1>
    <AddName />
    <hr/>
    <ManageNames />
   
  </ApolloProvider>;
}

ReactDOM.render(<App />, document.querySelector('.container'));
