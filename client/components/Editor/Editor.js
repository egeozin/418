import React, { useState, useEffect } from 'react';
import { useUser } from '../../utils/auth/useUser';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditorArea from './EditorArea';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  editorMainContainer: {},
  title: {
    fontSize: 36,
    fontFamily: 'Hind, sans-serif',
    fontWeight: 700,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

const Editor = (props) => {
  const classes = useStyles();
  const { user, logout } = useUser();

  if (!user) {
    return <CircularProgress />;
  }
  return (
    <Grid className={classes.editorMainContainer} xs={12}>
      <Typography variant="h3" component="h3" className={classes.title} gutterBottom>
        Soru Taslağı
      </Typography>
      <Divider className={classes.divider} />
      <Grid container direction="column" wrap="nowrap">
        <EditorArea userId={user.id} userName={user.username} />
      </Grid>
    </Grid>
  );
};

export default Editor;
