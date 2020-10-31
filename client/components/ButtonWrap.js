import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = (color) => {
  return makeStyles((theme) => (theme.palette.primary.main = color));
};

const ButtonWrap = (props) => {
  const classes = {};
  return (
    <Button
      disabled={props.disabled}
      classes={props.classes}
      variant="contained"
      color="primary"
      onClick={props.onClick}
      size="large"
      fullWidth
    >
      Sign Up
    </Button>
  );
};

ButtonWrap.propTypes = {};

export default ButtonWrap;
