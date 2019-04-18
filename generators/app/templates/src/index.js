import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './services/registerServiceWorker';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createGenerateClassName, createMuiTheme, jssPreset } from '@material-ui/core/styles';
import theme from './theme';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { BrowserRouter as Router } from 'react-router-dom';
<% if (I18) { %>
import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';
<% } %>
const jss = create({
  ...jssPreset()
});

const generateClassName = createGenerateClassName();

ReactDOM.render(
  <% if(I18) { %><I18nextProvider i18n={i18n}> <% } %>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Router>
         <App />
        </Router>
      </JssProvider>
    </MuiThemeProvider>
  <% if (I18) { %> </I18nextProvider> <% } %>,
  document.getElementById('root')
);

registerServiceWorker();
