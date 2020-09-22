/* globals window */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import cookie from "js-cookie";
import initFirebase from "../utils/auth/initFirebase";


// Init the Firebase app.
initFirebase();

const createUser = async (email, uid, uname) =>
  fetch("/api/user/create", {
    method: "POST",
    body: JSON.stringify({ email: email, userId: uid, username: uname }),
  }).then((res) => res.json());

const getUsername = (uid, token) =>
  fetch(`/api/user/getUsername/${uid}`, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const generateImage = (uid) => {
  fetch('https://europe-west3-portal-284118.cloudfunctions.net/generate-avatar', {
    method: "POST",
    body: `${uid}`
  }).then((res) => res.json())
    .catch( (err) =>{
      console.log('Request failed', err)
    });
}

const isNewUser = async (uid, email, token, path) => {
  // create random username
  var uname = "user-" + Math.floor(Math.random() * 1000000);
  var userData = {
    id: uid,
    username: uname,
    email,
    token: token,
  };
  cookie.set("auth", userData, {
    expires: 1,
  });

  await generateImage(uid);
  await createUser(email, uid, uname);
  
  /*
  path[0] != "standard"
    ? window.location.assign(`/${path.join("/")}`)
    : window.location.assign("/");
  */
  window.location.assign(`/user/${uid}`)
};

const isNotNewUser = async (uid, email, token, path) => {
  var { uname } = await getUsername(uid, token);
  var userData = {
    id: uid,
    username: uname,
    email,
    token: token,
  };
  cookie.set("auth", userData, {
    expires: 1,
  });

  (path[0] == "standard" || path[0] == "user")
    ? window.location.assign("/")
    : window.location.assign(`/${path.join("/")}`)
};

const returnConfig = (path) => {
  return {
    signInFlow: "popup",
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
        clientId:
          "676285786604-snen415p8senhpfaqhk8s4g3r9o06ch2.apps.googleusercontent.com",
      },
      {
        provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
    signInSuccessUrl: "/",
    credentialHelper: "none",
    callbacks: {
      signInSuccessWithAuthResult: (
        { user, additionalUserInfo },
        redirectUrl
      ) => {
        console.log("returnConfig -> user", additionalUserInfo);
        // xa is the access token, which can be retrieved through
        //firebase.auth().currentUser.getIdToken();
        const { uid, email, xa } = user;
        if (additionalUserInfo.isNewUser) {
          isNewUser(uid, email, xa, path);
        } else {
          isNotNewUser(uid, email, xa, path);
        }
        return false;
      },
    },
  };
};

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  const router = useRouter();
  const { path } = router.query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div>
      {renderAuth && path ? (
        <StyledFirebaseAuth
          uiConfig={returnConfig(path)}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
