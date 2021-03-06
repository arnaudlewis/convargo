import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Router from '../Router';
import App from '../../client/components/App.jsx';
import Home from '../../client/components/Home.jsx';
import WebsiteForm from '../../client/components/WebsiteForm.jsx';

export default (
  <Route path={Router.App.index} component={App}>
    <IndexRoute component={Home} />
    <Route path={Router.App.newWebsite} component={WebsiteForm} />
  </Route>
);
