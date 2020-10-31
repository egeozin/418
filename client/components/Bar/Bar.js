import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import Link from '../Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleLink: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Hind',
    fontWeight: 700,
    fontSize: 24,
    color: theme.palette.secondary.main,
    //background: `-webkit-linear-gradient(135deg, #ff921e, #ff921e 85%, #2B9AEA)`,
    //'-webkit-background-clip': 'text',
    //'-webkit-text-fill-color': 'transparent',
  },
  login: {
    fontSize: 16,
    fontWeight: 600,
  },
  iconButton: {
    fontSize: '0rem',
  },
}));

const Bar = (props) => {
  const classes = useStyles();
  let cookie,
    userId = null;

  const parseIdFromCookie = (str) => {
    const char = '"id":';
    const auth = str.substring(str.indexOf(char) + char.length);
    return auth.substring(1, auth.indexOf('"%2C"'));
  };

  if (typeof window !== 'undefined') {
    cookie = decodeURI(document.cookie);
    userId = parseIdFromCookie(cookie);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none' }} className={classes.titleLink}>
            <Typography variant="h2" component="h2" className={classes.title}>
              {'{ Kod Koda }'}
            </Typography>
          </Link>
          {!props.authPage ? (
            props.auth ? (
              <>
                <IconButton className={classes.iconButton}>
                  <Link href="/user/[id]/" as={`/user/${userId}`}>
                    <AccountCircleIcon
                      fontSize="large"
                      color="secondary"
                      className={classes.circleButton}
                    />
                  </Link>
                </IconButton>

                <Button color="inherit" onClick={() => props.logOut()}>
                  <Typography variant="h4" className={classes.login}>
                    {' '}
                    Çıkış Yap{' '}
                  </Typography>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/standard" className={classes.menuButton}>
                  <Typography variant="h4" className={classes.login}>
                    {' '}
                    Giriş Yap{' '}
                  </Typography>
                </Link>
                <Link href="/auth/signup" className={classes.menuButton}>
                  <Typography variant="h4" className={classes.login}>
                    {' '}
                    Üye Ol{' '}
                  </Typography>
                </Link>
              </>
            )
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bar;
