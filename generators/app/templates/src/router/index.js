import React from 'react';
import { Switch, Route } from <% if (Redux) { %>'react-router'<% } else { %>'react-router-dom'<% } %>;

import * as Routes from '../constants/routing';

// views
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';<% if (mobX) { %>
import HomeModel from 'models/HomeModel';

const storeHome = new HomeModel();<% } %>

const Router = () => (
  <Switch>
    <Route exact path={Routes.HOME} <% if (mobX) { %>render={(props) => <Home {...props} store={storeHome} /> }<% } else { %>component={Home}<% } %> />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Router;
