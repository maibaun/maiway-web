import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { authSvc } from "../fBase";
import { connect } from "react-redux";
import { loginProps, setLoginUserObj } from "../store/loginReducer";

interface AppProps {
  setLoginUserObj: (data: loginProps) => void;
}

function App({ setLoginUserObj }: AppProps) {
  // setLoginnedIn(authSvc.currentUser);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authSvc.onAuthStateChanged((user: any) => {
      // console.log(user);
      if (user) {
        setLoginUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args: any) => user.updateProfile(args),
        });
      } else {
        setLoginUserObj({
          displayName: null,
          uid: null,
          photoURL: null,
          updateProfile: null,
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user: any = authSvc.currentUser;
    setLoginUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args: any) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} /> : "Initializing..."}
      {/* <footer>&copy; Maiway {new Date().getFullYear()}</footer> */}
    </>
  );
}

function mapDispatchToProps(dispatch: any) {
  return {
    setLoginUserObj: (data: loginProps) => dispatch(setLoginUserObj(data)),
  };
}
export default connect(null, mapDispatchToProps)(App);
