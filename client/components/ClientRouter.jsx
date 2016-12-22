import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../../app/conf/client.routes.js';

export default class ClientRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
    );
  }
}
