import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";
import Navigation from "../components/Navigation";
import { loginProps } from "../store/loginReducer";
import Profile from "../routes/Profile";

interface AppRouterProps {
  userObj: loginProps;
}
const AppRouter = ({ userObj }: AppRouterProps) => {
  return (
    <Router>
      {userObj && <Navigation />}
      <Switch>
        {userObj ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
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

export default AppRouter;
