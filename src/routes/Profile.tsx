import React from "react";
import { authSvc } from "../fBase";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authSvc.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
