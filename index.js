const express = require('express');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const { withFilter } = require('apollo-server');

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
		names : [User]
	}

	type Mutation {
		addName (name: String!) : Boolean
	}

	type Subscription {
		nameAdded (code: String) : User
	}

	type User {
		name: String
		count: Int
	}

`;

const names = [];

const resolvers = {
	Query: {
		_: function (_, { name }) {
			return "Yo, " + name;
		},

		nameCount: function (_) {
			return names.length;
		},
		names: function () {
			return names;
		}
	},

	Mutation: {
		addName: function (_, { name }) {
			const currentName = names.find(n => n.name == name);

			if (!currentName) {
				names.push({ name });
				pubsub.publish("NAME_ADDED", {
					nameAdded: {
						name,
						count: names.length
					}
				});
			}
		}
	},
	Subscription: {
		nameAdded: {
			subscribe: withFilter(() => pubsub.asyncIterator(["NAME_ADDED"]),
				(payload, variables) => {

					console.log(payload);
					console.log(variables);

					return true;
				})
		}

	}
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		return {
		};
	}
});

app.use(compression());
apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);

app.use(express.static('dist'));

httpServer.listen(PORT, function () {
	console.log(`App started in on ${PORT}`);
});