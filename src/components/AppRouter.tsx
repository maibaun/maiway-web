import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";
import { loginProps } from "../store/loginReducer";

interface AppRouterProps {
  isLoggedIn: loginProps;
}
const AppRouter = ({ isLoggedIn }: AppRouterProps) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Route exact path="/">
            <Home />
          </Route>
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
