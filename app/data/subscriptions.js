import { PubSub, SubscriptionManager } from 'graphql-subscriptions'
import schema from './gqlSchema'

const pubsub = new PubSub()
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
})

export { subscriptionManager, pubsub }
