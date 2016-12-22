import React from 'react';
import { Link } from 'react-router';

import Router from '../../app/Router';

export default class Home extends React.Component {

  constructor() {
    super();
    this._handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit(event) {
    event.preventDefault();

    const url = this.refs.input.value;
    console.log(url)
  }

  render() {
    return (
      <div>
        <Link to={Router.App.index}>Go Back to List</Link>
        <form onSubmit={this._handleSubmit}>
          <input type="text" ref="input" placeholder="web url" />
          <button type="submit">Submit</button>
      </form>
      </div>
    );
  }
}
