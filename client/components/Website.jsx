import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';
import Vote, { Kind } from './Vote.jsx';

const createCommentMutation = gql`
  mutation createComment($websiteId: String!, $comment: String!) {
    createComment(websiteId: $websiteId, comment: $comment) {
      comment
    }
  }
`;

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

@graphql(voteWebsiteMutation, {name: 'voteWebsiteMutation'})
@graphql(createCommentMutation, {name: 'createCommentMutation'})
class Website extends React.Component {

  constructor(props) {
    super()
    this.onVote = ::this.onVote
    this.onPostComment = ::this.onPostComment
    this.state = {votes: props.votes, comments: props.comments}
  }

  onVote(voteIncr) {
    this.props.voteWebsiteMutation({
      variables: {
        websiteId: this.props._id,
        incr: voteIncr
      },
      optimisticResponse: {
        __typename: 'Mutation',
        voteWebsite: {
          __typename: 'Website',
          votes: this.props.votes + voteIncr,
        },
      },
    })
    .then(({ data }) => {
      this.setState({votes: data.voteWebsite.votes})
    }).catch((error) => {
      console.error(error)
      window.alert('Failed to vote');
    });
  }

  onPostComment(commentText) {
    this.props.createCommentMutation({
      variables: {
        websiteId: this.props._id,
        comment: commentText
      },
      optimisticResponse: {
        __typename: 'Mutation',
        voteWebsite: {
          __typename: 'Comment',
          comment: this.props.comments.concat([{comment: commentText}]),
        },
      },
    })
    .then(({ data }) => {
      console.log(data)
      this.setState({
        comments: this.props.comments.concat([data.createComment.comment])
      });
    }).catch((error) => {
      console.error(error)
      window.alert('Failed to create comment');
    });
  }

  render() {
    return (
      <div className="website">
        <div className="infos">
          <p className="name">{`${this.state.votes} vote${this.state.votes === 1 ? '' : 's'} - ${this.props.title}`}</p>
          <p className="url">{this.props.url}</p>
          <Vote websiteId={this.props._id} kind={Kind.UP} onVote={this.onVote} />
          <Vote websiteId={this.props._id} kind={Kind.DOWN} onVote={this.onVote} />
        </div>
        <div className="comments">
          {
            this.props.comments.map((c, index) => {
              return <Comment key={index} {...c} />;
            })
          }
        </div>
        <CommentForm onSubmit={this.onPostComment} />
      </div>
    );
  }
}

Website.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  votes: React.PropTypes.number.isRequired,
};

export default Website;
