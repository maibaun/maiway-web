import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";
import Navigation from "../components/Navigation";
import { loginProps } from "../store/loginReducer";
import Profile from "../routes/Profile";
import { connect } from "react-redux";
import { rootState } from "../store";

interface AppRouterProps {
  userObj: loginProps;
  refreshUser: () => void;
}
const AppRouter = ({ userObj, refreshUser }: AppRouterProps) => {
  return (
    <Router>
      {/* {userObj.uid && <Navigation />} */}
      <Switch>
        {userObj.uid ? (
          <>
            <Route exact path="/:id">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/profile">
              <Profile refreshUser={refreshUser} />
            </Route> */}
          </>
        ) : (
          <Route exact path="/">
            <Login />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

function mapStateToProps(state: rootState) {
  return { userObj: state.loginReducer };
}

export default connect(mapStateToProps)(AppRouter);
