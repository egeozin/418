import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useUser } from '../utils/auth/useUser';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import React from 'react';
import About from '../components/About';

import { Layout } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {},
  aboutContainer: {
    maxWidth: 900,
    paddingTop: 100,
    padding: 20,
  },
}));

const url = 'https://kodkoda.com/hakkimizda';
const title =
  'Hakkımızda – Kod Koda Kodluyoruz gönüllülerinin ürettiği bir soru-cevap paylaşım sitesidir';

const AboutPage = () => {
  const classes = useStyles();
  const { user, logout } = useUser();
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <Layout user={user ? user : null} auth={user ? true : false} logOut={logout} authPage={false}>
        <Container className={classes.aboutContainer}>
          <About />
        </Container>
      </Layout>
    </>
  );
};

export default AboutPage;
