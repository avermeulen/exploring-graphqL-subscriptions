
const { gql } = require('apollo-server-express');


module.exports = gql`

type Query {
	_ (name: String!) : String
	nameCount: Int!
	names : [User]

}

type Mutation {
	addName (name: String!) : Boolean
}

type Subscription {
	nameAdded (name: String): User
	nameUpdated (name: String): User
}

type Ticker {
	tickerId : String!
	Question : String!
	participantCounter: Int
	answers: [String]
}

type User {
	name: String
	count: Int
}`;


