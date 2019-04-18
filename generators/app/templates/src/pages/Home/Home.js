import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import injectSheet from 'react-jss';<% if (I18) { %>
import { withTranslation } from 'react-i18next';<% } %>
import styles from './styles';
<% if (I18) { %>
@withTranslation()<% } %>
@injectSheet(styles)
export default class Home extends PureComponent {
  static propTypes = {
    route: PropTypes.string,<% if (I18) { %>
    t: PropTypes.func.isRequired,<% } %>
  };

  render() {
    const {
      route,
      classes,<% if (I18) { %>
      t,<% } %>
    } = this.props;

    return (
      <div>
        <ReactHelmet
          title="Home screen"
        />
        <div className={classes.title}><% if (I18) { %>
          {t('home:homeTitle')}<% } else { %>
          Title<% } %>
        </div>
        {route}
      </div>
    );
  }
}
