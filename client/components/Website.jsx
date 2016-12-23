import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';
import Vote, { Kind } from './Vote.jsx';

class Website extends React.Component {

  constructor(props) {
    super();
    this._onVote = ::this._onVote;
    this._onComment = ::this._onComment;
  }

  _onComment(commentText) {
    return this.props.onComment(commentText);
  }

  _onVote(incr) {
    return this.props.onVote(incr);
  }

  render() {
    return (
      <div className="website">
        <div className="infos">
          <p className="name">{`${this.props.votes} vote${this.props.votes === 1 ? '' : 's'} - ${this.props.title}`}</p>
          <p className="url">{this.props.url}</p>
          <Vote websiteId={this.props._id} kind={Kind.UP} onVote={this._onVote} />
          <Vote websiteId={this.props._id} kind={Kind.DOWN} onVote={this._onVote} />
        </div>
        <div className="comments">
          {
            this.props.comments.map((c, index) => <Comment key={index} {...c} />)
          }
        </div>
        <CommentForm onSubmit={this._onComment} />
      </div>
    );
  }
}

Website.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  votes: React.PropTypes.number.isRequired,
  onVote: React.PropTypes.func.isRequired,
  onComment: React.PropTypes.func.isRequired,
};

export default Website;
