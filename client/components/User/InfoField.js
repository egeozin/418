import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    padding: 10,
  },
  value: {
    padding: 10,
  },
  divider: {
    backgroundColor: theme.palette.background.paper,
  },
  TextFieldContainer: {
    marginBottom: 20,
    '& input': {
      color: '#fff',
    },
    '& label': {
      color: '#fff',
    },
  },
  error: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  formInputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
}));

const InfoField = (props) => {
  const classes = useStyles();
  const { label, isDisabled, value, handleChange, isEditMode, id, name, formik } = props;

  if (isEditMode) {
    return (
      <Grid container item className={classes.formInputContainer}>
        <TextField
          className={classes.TextFieldContainer}
          id={id}
          name={name}
          label={label}
          rowsMax={4}
          value={value}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        {formik.errors[id] ? <div className={classes.error}>{formik.errors[id]}</div> : null}
      </Grid>
    );
  } else {
    return (
      <Grid item className={classes.container}>
        <Typography variant="h4" className={classes.label}>
          {label}
        </Typography>
        <Divider className={classes.divider} />

        <Typography variant="h5" className={classes.value}>
          {value}
        </Typography>
      </Grid>
    );
  }
};

export default InfoField;
