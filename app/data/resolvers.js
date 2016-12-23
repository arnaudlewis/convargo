import Api from '../controllers/Api';

const resolveFunctions = {
  Query: {
    websites() {
      return Api.getAllWebsites();
    },
  },
  Mutation: {
    createWebsite(_, { url }) {
      return Api.createWebsite(url);
    },

    createComment(_, { websiteId, comment }) {
      return Api.createComment(websiteId, comment);
    },

    voteWebsite(_, { websiteId, incr }) {
      return Api.voteWebsite(websiteId, incr);
    },
  },
  Website: {
    comments({ _id }) {
      return Api.getAllComments(_id);
    },
  },
};

export default resolveFunctions;
