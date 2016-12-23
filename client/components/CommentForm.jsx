import React from 'react';

class CommentForm extends React.Component {

  constructor() {
    super();
    this._handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit(event) {
    event.preventDefault();

    const commentArea = this.refs.commentArea;
    const commentText = commentArea.value;
    this.props.onSubmit(commentText)
    .then(() => commentArea.value = '');
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <textarea ref="commentArea" required></textarea>
        <button type="submit">Post</button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}

export default CommentForm;
