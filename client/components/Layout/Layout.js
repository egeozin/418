import React,{useEffect, useState} from "react";
import { Bar, Footer } from "../../components";
import Cookies from 'js-cookie';

const Layout = ({ children, auth, authPage, logOut }) => {

  const [cookieAuth, setCookieAuth] = useState(false);
  // auth information control from cookies , for bar 
  useEffect(()=>{
    setCookieAuth(Cookies.get('auth') ? true : false);
  },[])

  return (
    <>
      {/* (auth value) allows him to check the auth value assigned to the pages before for now */}
      <Bar auth={cookieAuth?cookieAuth:auth} logOut={logOut} authPage={authPage} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
