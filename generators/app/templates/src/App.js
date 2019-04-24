import React, { Component } from 'react';

import Router from 'router';
import Header from 'components/Header';
import Loading from 'components/Loading';
import ProgressLine  from 'components/ProgressLine';<% if (mobX) { %>
import DevTools from 'mobx-react-devtools';<% } %>

class App extends Component {
  render() {
    return (
      <Loading>
        <ProgressLine />
        <Header />
        <Router /><% if (mobX) { %>
        <DevTools /><% } %>
      </Loading>
    );
  }
}

export default App;
