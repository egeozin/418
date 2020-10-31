import { useRouter } from 'next/router';
import { useUser } from '../../../utils/auth/useUser';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import UserBody from '../../../components/User/UserBody';

import { Layout } from '../../../components';
import CircularProgress from '@material-ui/core/CircularProgress';

const fetcher = async (...args) => {
  const res = await fetch(...args);

  return res.json();
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const User = () => {
  const classes = useStyles();

  const { user, logout } = useUser();
  const [selfUser, setSelfUser] = useState(true);

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/user/${id}`, fetcher);

  return (
    <Layout user={user ? user : null} auth={user ? true : false} logOut={logout} authPage={false}>
      <Container fixed>
        {!data ? (
          <CircularProgress />
        ) : (
          <UserBody data={data} user={user} handleChange={handleChange} />
        )}
      </Container>
    </Layout>
  );
};

export default User;
