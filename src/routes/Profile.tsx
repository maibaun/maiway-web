import React, { useState } from "react";
import { authSvc } from "../fBase";
import { useHistory } from "react-router-dom";
import { rootState } from "../store";
import { connect } from "react-redux";
import { loginProps } from "../store/loginReducer";

interface ProfileProps {
  userObj: loginProps;
  refreshUser: () => void;
}

const Profile = ({ userObj, refreshUser }: ProfileProps) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(
    userObj?.displayName || ""
  );

  const onLogOutClick = () => {
    authSvc.signOut();
    history.push("/");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
        />
        <input
          type="submit"
          value="Update Profile"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

function mapStateToProps(state: rootState) {
  return { userObj: state.loginReducer };
}

export default connect(mapStateToProps)(Profile);
