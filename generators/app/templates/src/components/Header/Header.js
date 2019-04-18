import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import styles from './styles';

@injectSheet(styles)
export default class Header extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    const { root } = classes;

    return (
      <div className={root}>
        <h4>Title</h4>
      </div>
    );
  }
}
