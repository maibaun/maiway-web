import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { authSvc } from "../fBase";
import { connect } from "react-redux";
import { loginProps, setLoginUserObj } from "../store/loginReducer";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FQcheckUser } from "../fQuery";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      top: "50%",
      left: "50%",
      zIndex: 999,
      transform: "Translate(-50%, -50%)",
    },
  })
);

const Initializing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span>Initializing...</span>
    </div>
  );
};

const LoadingIndicator = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

interface AppProps {
  setLoginUserObj: (data: loginProps) => void;
}

function App({ setLoginUserObj }: AppProps) {
  // setLoginnedIn(authSvc.currentUser);

  const [init, setInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    authSvc.onAuthStateChanged(async (user: any) => {
      console.log(user);
      if (user) {
        const arrUserInfo = await FQcheckUser(user.uid);
        if (arrUserInfo.length > 0) {
          setLoginUserObj({
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            updateProfile: (args: any) => user.updateProfile(args),
          });
        } else {
          alert("There is no user record corresponding to this identifier.");
          authSvc.signOut();
        }
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

  type typeProp = "WAITING" | "SUCCESS";
  const callLoading = (type?: typeProp) => {
    if (type) {
      const isLoading = type === "WAITING" ? true : false;
      setIsLoading(isLoading);
      // setIsLoading((prevState: boolean) => !prevState);
    }
  };
  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} callLoading={callLoading} />
      ) : (
        <Initializing />
      )}
      {isLoading && <LoadingIndicator />}
    </>
  );
}

function mapDispatchToProps(dispatch: any) {
  return {
    setLoginUserObj: (data: loginProps) => dispatch(setLoginUserObj(data)),
  };
}
export default connect(null, mapDispatchToProps)(App);
