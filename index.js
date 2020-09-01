const express = require('express');
const compression = require('compression');
const { ApolloServer} = require('apollo-server-express');
const { gql } = require('apollo-server-express');

const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const http = require('http');
const PORT = process.env.port || 3017;

const app = express();
const httpServer = http.createServer(app);

const typeDefs = gql`

	type Query {
		_ (name: String!) : String
		nameCount: Int!
	}

	type Mutation {
		addName (name: String!) : Boolean
	}

	type Subscription {
		nameAdded: String
	}

`;

const names = [];

const resolvers = {
	Query : {
		_: function(_, {name}) {
			return "Yo, " + name;
		},

		nameCount: function(_) {
			return names.length;
		}
	},

	Mutation : {
		addName : function(_, {name}) {
			names.push(name);
			pubsub.publish("NAME_ADDED", { nameAdded: name });

		}
	},
	Subscription : {
		nameAdded : {
			subscribe: () => pubsub.asyncIterator(["NAME_ADDED"])
		}

	}
};

const apolloServer = new ApolloServer({ 
	typeDefs, 
	resolvers,
	context : ({req}) => {
		return {
		};
	}});

app.use(compression()); 
apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);

// app.use(express.static('dist'));

httpServer.listen(PORT, function () {
	console.log(`App started in on ${PORT}`);
});