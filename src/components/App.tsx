import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { authSvc } from "../fBase";
import { connect } from "react-redux";
import { loginProps, setLoginnedIn } from "../store/loginReducer";
import { rootState } from "../store";

interface AppProps {
  isLoggedIn: loginProps;
  setLoginnedIn: any;
}

function App({ isLoggedIn, setLoginnedIn }: AppProps) {
  // setLoginnedIn(authSvc.currentUser);
  useEffect(() => {
    authSvc.onAuthStateChanged((user: any) => {
      if (user) {
        setLoginnedIn(true);
      } else {
        setLoginnedIn(false);
      }
    });
  }, []);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Maiway {new Date().getFullYear()}</footer>
    </>
  );
}

function mapStateToProps(state: rootState) {
  return { isLoggedIn: state.loginReducer };
}

function mapDispatchToProps(dispatch: any) {
  return { setLoginnedIn: (data: any) => dispatch(setLoginnedIn(data)) };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
