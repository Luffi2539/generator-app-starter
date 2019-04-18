import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import injectSheet from 'react-jss';
import styles from './styles';

const ProgressLine = ({
  classes,
  requestsSize,
  averageProgress
}) => {
  if (!requestsSize) {
    return null;
  }

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={averageProgress}
      />
    </div>
  );
};

ProgressLine.propTypes = {
  classes: PropTypes.object,
  requestsSize: PropTypes.number,
  averageProgress: PropTypes.number,
};

export default injectSheet(styles)(ProgressLine);
