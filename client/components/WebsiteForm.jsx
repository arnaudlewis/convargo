import React from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Router from '../../app/Router';

const createWebsiteMutation = gql`
  mutation createWebsite($url: String!) {
    createWebsite(url: $url) {
      url
    }
  }
`;

@graphql(createWebsiteMutation, { name: 'createWebsiteMutation' })
export default class Home extends React.Component {

  constructor() {
    super();
    this._handleSubmit = ::this._handleSubmit;
  }

  _handleSubmit(event) {
    event.preventDefault();

    const url = this.refs.input.value;
    this.props.createWebsiteMutation({
      variables: {
        url,
      },
    })
    .then(({ data }) => {
      this.props.router.push(Router.App.index);
    }).catch((e) => {
      window.alert(e);
    });
  }

  render() {
    return (
      <div className="website-form">
        <div className="align-right">
          <Link to={Router.App.index}><button>Go Back to List</button></Link>
        </div>

        <h1>Share your URL</h1>
        <form onSubmit={this._handleSubmit}>
          <input type="text" ref="input" placeholder="web url" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
