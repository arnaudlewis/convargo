import Api from '../controllers/Api'

const resolveFunctions = {
  Query: {
    websites() {
      return Api.getAllWebsites();
    },
  },
  Mutation: {
    createWebsite(websiteURL) {
      return Api.createWebsite(websiteURL);
    },

    createComment(wId, text) {
      return Api.createComment(wId, text);
    },

    voteWebsite(wId, incr) {
      return Api.voteWebsite(wId, incr);
    },
  },
  Website: {
    comments({_id}) {
      return Api.getAllComments(_id);
    },
  },
};

export default resolveFunctions;
