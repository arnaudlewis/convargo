import { pubsub } from './subscriptions';

import WebsiteRepo from '../models/WebsiteRepo'
import CommentRepo from '../models/CommentRepo'

const resolveFunctions = {
  Query: {
    websites() {
      return WebsiteRepo.getAll();
    },
  },
  Mutation: {
    upvoteWebsite(_, { wId }) {
      const website = websites.find(w => w.id === wId);
      if (!website) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      website.votes += 1;
      pubsub.publish('websiteUpvoted', website);
      return website;
    },
  },
  Subscription: {
    websiteUpvoted(post) {
      return post;
    },
  },
  Website: {
    comments({_id}) {
      return CommentRepo.getAllByWebsiteId(_id)
    },
  },
};

export default resolveFunctions;
