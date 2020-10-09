import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import gql from 'graphql-tag';
import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSubscription, useQuery, useMutation } from '@apollo/react-hooks';


// alert(JSON.stringify(process.env.GRAPHQL_URL));

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

const subscription = gql`
  subscription nameAdded {
    nameAdded (code : "123") {
      name,
      count
    }
}`;

const  userCountQuery = gql`
  query getName {
    nameCount
  }
`;

function AddName(props) {

  const [name, setName]  = useState("");

  const ADD_USER = gql`
    mutation addName($name : String!) {
      addName(name : $name)
    }
  `;

  const [mutate] = useMutation(ADD_USER);

  function addName(){
    mutate({
      variables : {
        name
      }
    }).then(function() {
      setName("");
    })
  }

  return <div>
    <div >
      <input type="text" onChange={(evt) => setName(evt.target.value)} value={name}  />
    </div>
    <div>
      <button onClick={addName} disabled={name.length < 3} >Add name</button>
    </div>
  </div>
}


function Counter (props) {
  return <div>User count: <span > {props.counter}</span> </div>
}

function Data(props) {
  const {data,loading} = useSubscription(subscription);

  if (data) {
    return <Counter counter={data.nameAdded.count} />
  } else {
    return <Counter counter={props.counter} />
  }
}

function Query () {

  const {data, loading} = useQuery(userCountQuery);
	
  if (loading)
    return "loading..."

  return <div>
    <Data counter={data.nameCount}/>
    <AddName />
  </div>

}



function App() {

  // alert(process.env.name);

	return <ApolloProvider client={apolloClient}>
    <Query />
	</ApolloProvider>
	
	;
}

ReactDOM.render(<App />, document.querySelector('.container'));
