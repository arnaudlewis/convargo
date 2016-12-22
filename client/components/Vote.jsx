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
    const label = this.props.kind === Kind.UP ? 'UpVote' : 'DownVote';
    return (
      <span onClick={this._handleClick}>{label}</span>
    );
  }
}

Vote.propTypes = {
  kind: React.PropTypes.oneOf(R.values(Kind)),
  onVote: React.PropTypes.func.isRequired,
}

export default Vote;
