import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  tooltip: { fontSize: 16 },
  info: { marginLeft: 10 },
};

const InfoTooltip = ({ classes, infoTooltip }) => (
  <Tooltip
    classes={{ tooltip: classes.tooltip }}
    title={infoTooltip}
    aria-label={infoTooltip}
    placement="top"
  >
    <InfoIcon className={classes.info} fontSize="small" />
  </Tooltip>
);

InfoTooltip.propTypes = {
  classes: PropTypes.shape({}),
  infoTooltip: PropTypes.node,
};

export default withStyles(styles)(InfoTooltip);
