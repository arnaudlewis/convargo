import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import Router from '../../app/Router';
import Website from './Website.jsx';

const websiteListQuery = gql`query WebsiteList { websites { _id, url, title, votes, comments{ comment } } }`;

@graphql(websiteListQuery)
export default class Home extends React.Component {

  constructor() {
    super();
    this.renderList = ::this.renderList;
  }

  renderList() {
    if(this.props.data.length === 0) {
      return <div className="empty">Empty</div>
    } else {
      return (this.props.data.websites || []).sort((a, b) => b.votes - a.votes).map((w, index) => {
        return <Website key={index} {...w} />;
      })
    }
  }

  render() {
    return (
      <div className="home">
        <h1>Hacker News Feed</h1>
        <div className="align-right">
          <Link to={Router.App.newWebsite}><button className="button--add">Add Item</button></Link>
        </div>
        {this.renderList()}
      </div>
    );
  }
}
