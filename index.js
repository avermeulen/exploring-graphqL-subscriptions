const express = require('express');
const compression = require('compression');
const { ApolloServer } = require('apollo-server-express');
const { withFilter } = require('apollo-server');
const typeDefs = require('./typeDefs');


const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const http = require('http');
const PORT = process.env.PORT || 3017;

const app = express();
const httpServer = http.createServer(app);

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


				names.push({ name, count : 1 });
				pubsub.publish("NAME_ADDED", {
					nameAdded: {
						user : {
							name, 
							count : 1
						},
						count: names.length
					}
				});
			} else {
				// console.log(currentName);
				currentName.count++;
				console.log(currentName);
				console.log("----------->");

				pubsub.publish("NAME_UPDATED", {
					nameUpdated: {
						...currentName
					
					}
				});

			}
		}
	},
	Subscription: {
		nameAdded: {
			subscribe: withFilter(() => pubsub.asyncIterator(["NAME_ADDED"]),
				(payload, variables) => {
					return true;
				})
		},
		nameUpdated: {
			subscribe: withFilter(() => pubsub.asyncIterator(["NAME_UPDATED"]),
				({nameUpdated}, {name}) => {
					const {user} = nameUpdated;
					// return user.name === name;
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