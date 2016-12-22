import React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div>{this.props.comment}</div>
    );
  }
}

Comment.propTypes = {
  _id: React.PropTypes.string,
  comment: React.PropTypes.string.isRequired,
  websiteId: React.PropTypes.string,
}

export default Comment;
