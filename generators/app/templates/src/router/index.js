import React from 'react';
import { Switch, Route } from <% if (Redux) { %>'react-router'<% } else { %>'react-router-dom'<% } %>;

import * as Routes from '../constants/routing';

// views
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

const Router = () => (
  <Switch>
    <Route exact path={Routes.HOME} component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Router;
