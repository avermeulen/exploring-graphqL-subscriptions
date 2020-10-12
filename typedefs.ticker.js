
const { gql } = require('apollo-server-express');


module.exports = gql`

type Query {
	_ (name: String!) : String
	nameCount: Int!
	names : [User]


	getTickers() : [Ticker]
	getTicker(ticketId) : Ticker

}

type Mutation {
	addName (name: String!) : Boolean
	
	createTicker(questionId: String!)
	joinTicker(tickerId : String!)
	answerTicker(tickerId : String, answer: String)
}

type Subscription {
	nameAdded (code: String): User
	nameUpdated (name: String): User

	tickerJoined(tickerId: String): User
	tickerAnswered(ticketId: String)

}

type Ticker {
	tickerId : String!
	Question : String!
	participantCounter: Int
	answers: [String]
}

type UserUpdate {
	name: String
	count: Int!
}

type User {
	name: String
	count: Int
}`;


