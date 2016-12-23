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
  createWebsite (
    url: String!
  ): Website

  createComment (
    websiteId: String!
    comment: String!
  ): Comment

  voteWebsite (
    websiteId: String!
    incr: Int!
  ): Website
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
