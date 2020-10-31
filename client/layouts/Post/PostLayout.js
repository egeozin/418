import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { Layout } from '../../components';

//import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 700,
    letterSpacing: 1,
  },
  rightTitle: {
    lineHeight: '29px',
  },
  divider: {
    marginBottom: 20,
  },
  postContainer: {
    maxWidth: 900,
  },
  postGridContainer: {
    marginTop: 60,
  },
  questionsContainer: {},
}));

const PostLayout = (props) => {
  const classes = useStyles();
  const { children, auth, logOut, authPage } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Layout auth={auth} logOut={logOut} authPage={authPage}>
      <Container maxWidth="md" className={classes.postContainer}>
        <Grid container className={classes.postGridContainer}>
          {children}
        </Grid>
      </Container>
    </Layout>
  );
};

export default PostLayout;
