import React, { <% if (mobX) { %>Component<% } else { %>PureComponent<% } %> } from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import injectSheet from 'react-jss';<% if (I18) { %>
import { withTranslation } from 'react-i18next';<% } %>
import styles from './styles';<% if (mobX) { %>
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';<% } %>
<% if (I18) { %>
@withTranslation()<% } %>
@injectSheet(styles)<% if (mobX) { %>
@observer<% } %>
export default class Home extends <% if (mobX) { %>Component<% } else { %>PureComponent<% } %> {
  static propTypes = {
    route: PropTypes.string,<% if (I18) { %>
    t: PropTypes.func.isRequired,<% } %>
  };<% if (mobX) { %>
  @observable inputValue = '';

  @action
  handleInputChange = e => {
    this.inputValue = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.store.addValue(this.inputValue);
    this.inputValue = '';
    document.getElementById('input').value = '';
  };<% } %>
  render() {
    const {
      route,
      classes,<% if (I18) { %>
      t,<% } %><% if (mobX) { %>
      store<% } %>
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
        {route}<% if (mobX) { %>
        <form onSubmit={this.handleFormSubmit}>
          New Input:
          <input
            id="input"
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.props.store.values.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </ul>
        InputsCount: {store.valuesCount}<% } %>
      </div>
    );
  }
}
