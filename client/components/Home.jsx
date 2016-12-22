import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import Router from '../../app/Router';
import Website from './Website.jsx';

const websiteListQuery = gql`query WebsiteList { websites { _id, url, title, votes, comments{ comment } } }`;

@graphql(websiteListQuery)
export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Link to={Router.App.newWebsite}>Add Item</Link>
        {
          this.props.data.websites.sort((a, b) => a.votes < b.votes).map((w, index) => {
            return <Website key={index} {...w} />;
          })
        }
      </div>
    );
  }
}
