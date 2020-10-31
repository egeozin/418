import React from 'react';
import { Bar, Footer } from '../../components';

const Layout = ({ children, auth, authPage, logOut }) => {
  return (
    <>
      <Bar auth={auth} logOut={logOut} authPage={authPage} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
