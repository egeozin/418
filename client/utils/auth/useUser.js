import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../auth/initFirebase';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        cookies.remove('auth');
        if (router.pathname.includes('/soru-sor')) {
          router.push('/');
        } else {
          router.reload('/');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cookie = cookies.get('auth');
    if (!cookie) {
      // TODO: We can check and allow routing when router.pathname contains "/soru" or "/",
      // redirect to "/", otherwise.
      //router.push('/')
      if (router.pathname.includes('/user')) {
        router.push('/auth/user');
        return;
      }

      if (router.pathname.includes('/soru-sor')) {
        router.push('/auth/soru-sor');
        return;
      }

      return;
    }
    setUser(JSON.parse(cookie));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export { useUser };
