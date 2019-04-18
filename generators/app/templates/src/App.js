import React, { Component } from 'react';

import Router from 'router';
import Header from 'components/Header';
import Loading from 'components/Loading';
import ProgressLine  from 'components/ProgressLine';

class App extends Component {
  render() {
    return (
      <Loading>
        <ProgressLine />
        <Header />
        <Router />
      </Loading>
    );
  }
}

export default App;
