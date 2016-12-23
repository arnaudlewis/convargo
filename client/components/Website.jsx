import React from 'react';

import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';
import Vote, { Kind } from './Vote.jsx';

class Website extends React.Component {

  onVote(voteIncr) {
    console.log(voteIncr)
  }

  onPostComment(commentText) {
    console.log(commentText)
  }

  render() {
    return (
      <div className="website">
        <div className="infos">
          <p className="name">{`${this.props.votes} vote${this.props.votes === 1 ? '' : 's'} - ${this.props.title}`}</p>
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
