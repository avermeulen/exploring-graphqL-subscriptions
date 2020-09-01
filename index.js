const express = require('express');
const compression = require('compression');
const { ApolloServer} = require('apollo-server-express');
const { gql } = require('apollo-server-express');

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

	# type Subscription {

	# }

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
		}
	},
	// Subscription : {

	// }
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

// app.use(express.static('dist'));

httpServer.listen(PORT, function () {
	console.log(`App started in on ${PORT}`);
});