import React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">{this.props.comment}</div>
    );
  }
}

Comment.propTypes = {
  comment: React.PropTypes.string.isRequired,
};

export default Comment;
