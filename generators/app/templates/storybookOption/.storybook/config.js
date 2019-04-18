import React from 'react';
import { configure, addDecorator } from '@storybook/react';

// decorators
import { ThemeProvider } from 'react-jss';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import theme from '../src/theme';

addDecorator(story =>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {story()}
      </ThemeProvider>
    </MuiThemeProvider>
);  // add correct context for react router components


function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
