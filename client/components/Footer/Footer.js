import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '../Link';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
const { SocialIcon } = require('react-social-icons');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    padding: '20px 0',
  },
  divider: {
    marginTop: 40,
    backgroundColor: theme.palette.background.paper,
  },
  footerContent: {
    margin: 'auto',
    padding: 50,
    maxWidth: 960,
  },
  auto: {
    minWidth: 200,
    [theme.breakpoints.down('md')]: {
      marginTop: 10,
    },
  },
  footerLink: {
    fontSize: 16,
    padding: '0 20px',
    textDecoration: 'none',
    color: '#036be8',
    fontFamily: 'Lato, sans-serif',
    fontWeight: '600',
    fontStyle: 'normal',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 7px',
    },
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1,
    fontFamily: 'Hind, sans-serif',
    fontStyle: 'normal',
  },
  icons: {
    display: 'block',
  },
  icon: {
    marginRight: 10,
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <div className={classes.footerContent}>
        <Grid container justify="center" alignItems="center">
          <Grid container item md={3} xs={12} direction="column" align="center" justify="center">
            <Grid item className={classes.auto}>
              <Typography className={classes.text}>© Kod Koda 2020</Typography>
            </Grid>
          </Grid>
          <Grid container item md={7} xs={12} direction="row" align="center" justify="center">
            <Grid item>
              {/* 
              <Link href={`/privacy-policy`} as={`/gizlilik-sozlesmesi`} >
                <MuiLink className={classes.footerLink}>Gizlilik Sözleşmesi</MuiLink>
              </Link>
               */}
              <Link href={`/about`} as={`/hakkimizda`}>
                <MuiLink className={classes.footerLink}>Hakkımızda</MuiLink>
              </Link>
            </Grid>
          </Grid>
          <Grid item md={2} xs={12} align="center">
            <SocialIcon
              className={classes.icon}
              style={{ height: 40, width: 40 }}
              network="github"
              bgColor="#ff921e"
              url="https://www.github.com/egeozin/418"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
