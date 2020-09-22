import React, { useEffect } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { authSvc } from "../fBase";
import { connect } from "react-redux";
import { loginProps, setLoginUserObj } from "../store/loginReducer";
import { rootState } from "../store";

interface AppProps {
  userObj: loginProps;
  setLoginUserObj: (data: loginProps) => void;
}

function App({ userObj, setLoginUserObj }: AppProps) {
  // setLoginnedIn(authSvc.currentUser);
  useEffect(() => {
    authSvc.onAuthStateChanged((user: any) => {
      if (user) {
        setLoginUserObj(user);
      } else {
        setLoginUserObj(null);
      }
    });
  }, []);
  return (
    <>
      <AppRouter userObj={userObj} />
      <footer>&copy; Maiway {new Date().getFullYear()}</footer>
    </>
  );
}

function mapStateToProps(state: rootState) {
  return { userObj: state.loginReducer };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setLoginUserObj: (data: loginProps) => dispatch(setLoginUserObj(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
