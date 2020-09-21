import React, { useState } from "react";
import { authSvc, firebaseInstance } from "../fBase";

const Login = () => {
  // const [newAccount, setNewAccount] = useState(true);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { email, password } = inputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let data;
      // if (newAccount) {
      //   data = await authSvc.createUserWithEmailAndPassword(email, password);
      // } else {
      data = await authSvc.signInWithEmailAndPassword(email, password);
      // }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSocialClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.target as HTMLButtonElement;
    const { name } = target;

    let provider: any;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
    }
    const data = await authSvc.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Login;
