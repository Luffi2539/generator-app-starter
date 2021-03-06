import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';<% if (I18) { %>
import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';<% } %>
import registerServiceWorker from './services/registerServiceWorker';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createGenerateClassName, createMuiTheme, jssPreset } from '@material-ui/core/styles';
import theme from './theme';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';<% if (Redux) { %>
import { Provider } from 'react-redux';
import store from './store';
import history from './store/history';
import { ConnectedRouter } from 'connected-react-router/immutable';<% } else { %>
import { BrowserRouter as Router } from 'react-router-dom';<% } %><% if (Firebase) { %>
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'config/fbConfig';
import config from 'config/fbConfig';<% } %>
const jss = create({
  ...jssPreset()
});

<% if (Firebase) { %>const rrfProps = {
  firebase,
  config: config,
  dispatch: store.dispatch,
  createFirestoreInstance
};<% } %>
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <% if(I18) { %><I18nextProvider i18n={i18n}> <% } %>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <JssProvider jss={jss} generateClassName={generateClassName}><% if (Redux) { %>
        <Provider store={store}>
          <ConnectedRouter history={history}><% if (Firebase) { %>
            <ReactReduxFirebaseProvider {...rrfProps}><% } %>
              <App /><% if (Firebase) { %>
            </ReactReduxFirebaseProvider><% } %>
          </ConnectedRouter>
        </Provider><% } else { %>
        <Router><% if (Firebase) { %>
          <ReactReduxFirebaseProvider {...rrfProps}><% } %>
            <App /><% if (Firebase) { %>
          </ReactReduxFirebaseProvider><% } %>
        </Router><% } %>
      </JssProvider>
    </MuiThemeProvider>
  <% if (I18) { %> </I18nextProvider> <% } %>,
  document.getElementById('root')
);

registerServiceWorker();
