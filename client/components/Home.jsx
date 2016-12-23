import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import R from 'ramda';

import Router from '../../app/Router';
import Website from './Website.jsx';

const websiteListQuery = gql`query WebsiteList { websites { _id, url, title, votes, comments{ comment } } }`;

const voteWebsiteMutation = gql`
  mutation voteWebsite($websiteId: String!, $incr: Int!) {
    voteWebsite(websiteId: $websiteId, incr: $incr) {
      _id
      url
      title
      votes
      comments { comment }
    }
  }
`;

const createCommentMutation = gql`
  mutation createComment($websiteId: String!, $comment: String!) {
    createComment(websiteId: $websiteId, comment: $comment) {
      comment
    }
  }
`;

@graphql(websiteListQuery)
@graphql(voteWebsiteMutation, {name: 'voteWebsiteMutation'})
@graphql(createCommentMutation, {name: 'createCommentMutation'})
export default class Home extends React.Component {

  constructor(props) {
    super();
    this.renderList = ::this.renderList;
    this.onVote = ::this.onVote;
    this.getWebsite = ::this.getWebsite;
    this.onComment = ::this.onComment;
    this.state = {websites: props.data.websites || []};
  }

  currentIndex() {

  }

  getWebsite(websiteId) {
    const currentIndex = R.findIndex(R.propEq('_id', websiteId))(this.state.websites)
    const current = this.state.websites[currentIndex]
    return {currentIndex, current};
  }

  onVote(websiteId, voteIncr) {
    const {currentIndex, current} = this.getWebsite(websiteId)

    this.props.voteWebsiteMutation({
      variables: {
        websiteId: websiteId,
        incr: voteIncr
      },
      optimisticResponse: {
        __typename: 'Mutation',
        voteWebsite: {
          __typename: 'Website',
          votes: current.votes + voteIncr,
        },
      },
    })
    .then(({ data }) => {
      const updated = R.set(R.lensProp('votes'), data.voteWebsite.votes, current)
      this.setState({websites: R.update(currentIndex, updated, this.state.websites)});
    }).catch((error) => {
      window.alert('Failed to vote');
    });
  }

  onComment(websiteId, commentText) {
    const {currentIndex, current} = this.getWebsite(websiteId)

    return this.props.createCommentMutation({
      variables: {
        websiteId: websiteId,
        comment: commentText
      },
      optimisticResponse: {
        __typename: 'Mutation',
        voteWebsite: {
          __typename: 'Comment',
          comment: current.comments.concat([{comment: commentText}]),
        },
      },
    })
    .then(({ data }) => {
      const updatedComments = current.comments.concat([{comment: data.createComment.comment}]);
      const updated = R.set(R.lensProp('comments'), updatedComments, current)
      this.setState({websites: R.update(currentIndex, updated, this.state.websites)});
    }).catch((error) => {
      window.alert('Failed to create comment');
    });
  }

  renderList() {
    if(this.props.data.length === 0) {
      return <div className="empty">Empty</div>
    } else {
      return this.state.websites.sort((a, b) => b.votes - a.votes).map((w, index) => {
        return (
          <Website
            key={index}
            onVote={this.onVote.bind(null, w._id)}
            onComment={this.onComment.bind(null, w._id)}
            {...w} />
        );
      })
    }
  }

  render() {
    return (
      <div className="home">
        <h1>Hacker News Feed</h1>
        <div className="align-right">
          <Link to={Router.App.newWebsite}><button className="button--add">Add Item</button></Link>
        </div>
        {this.renderList()}
      </div>
    );
  }
}
