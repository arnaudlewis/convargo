'use strict'

import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const itemListQuery = gql`query MyQuery { posts { id } }`;

@graphql(itemListQuery)
export default class Home extends React.Component {

  render() {
    console.log(this.props.data.posts)
    return (<div>Home</div>)
  }
}
