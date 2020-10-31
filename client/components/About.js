import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 25,
    marginTop: 25,
  },
  about: {
    fontSize: 20,
    fontWeight: 500,
    fontFamily: 'Hind, sans-serif',
    lineHeight: 1.5,
  },
}));

const About = (props) => {
  const classes = useStyles();
  return (
    <Grid container item>
      <Grid container direction="row" justify="space-around" alignItems="center" item xs={12}>
        <Typography className={classes.about}>
          Kod Koda Kodluyoruz gönüllülerinin ürettiği bir soru-cevap paylaşım sitesidir. Katkıda
          bulunmak isterseniz ya da sadece bizle iletişime geçmek isterseniz{' '}
          <a href={'mailto:' + 'info@kodluyoruz.org'}>info@kodluyoruz.org</a>'a email atabilirsiniz.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
