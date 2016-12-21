'use strict'

import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const itemListQuery = gql`query MyQuery { posts { id } }`;

@graphql(itemListQuery)
export default class Home extends React.Component {

  render() {
    return (<div>Home</div>)
  }
}
