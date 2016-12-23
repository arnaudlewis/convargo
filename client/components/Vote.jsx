import React from 'react';
import R from 'ramda';

export const Kind = {
  UP: 'up',
  DOWN: 'down',
}

class Vote extends React.Component {

  constructor() {
    super();
    this._handleClick = ::this._handleClick;
  }

  _handleClick(event) {
    return this.props.onVote(this.props.kind === Kind.UP ? 1 : -1);
  }

  render() {
    const content = this.props.kind === Kind.UP
      ? <i className="fa fa-thumbs-up" aria-hidden="true"></i>
      : <i className="fa fa-thumbs-down" aria-hidden="true"></i>;
    return (
      <span className="vote" onClick={this._handleClick}>{content}</span>
    );
  }
}

Vote.propTypes = {
  kind: React.PropTypes.oneOf(R.values(Kind)),
  onVote: React.PropTypes.func.isRequired,
}

export default Vote;
