import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Website {
  _id: String!
  url: String!
  title: String
  votes: Int!
  comments: [Comment]!
}

type Comment {
  _id: String!
  comment: String!
  websiteId: Int!
}

type Query {
  websites: [Website]!
}

type Mutation {
  upvoteWebsite (
    websiteId: String!
  ): Website
}

type Subscription {
  websiteUpvoted: Website
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
