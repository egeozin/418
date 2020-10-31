import FirebaseAuth from '../../../components/FirebaseAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, Grid } from '@material-ui/core';
import { Layout } from '../../../components';
import Consent from '../../../components/Consent';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  authContainer: {
    marginTop: 20,
  },
  consentContainer: {},
}));

const Auth = () => {
  const classes = useStyles();
  const router = useRouter();
  const [signedPolicy, setSignedPolicy] = useState(false);

  const giveConsent = (e) => {
    e.preventDefault();
    setSignedPolicy(true);
  };

  return (
    <Layout authPage={true}>
      <Grid container spacing={4} className={classes.authContainer}>
        {router.query.path ? (
          signedPolicy || router.query.path[0] == 'standard' ? (
            <Grid item xs={12} md={12}>
              <FirebaseAuth />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={3} />
              <Grid item style={{ textAlign: 'center' }} xs={12} md={6}>
                <Consent handleClick={giveConsent} />
              </Grid>
              <Grid item xs={12} md={3} />
            </>
          )
        ) : (
          <Grid item xs={12} md={12}>
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default Auth;
