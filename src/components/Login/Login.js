import { useState } from "react";
import Button from "../Button";
import s from "./Login.module.css";

export const LoginForm = ({ logInUser, setUser, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    logInUser({ email, password }, setUser, setIsLoggedIn);
    // dispatch(operations.logInUser({ email: email, password: password }));
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  return (
    <><h2>Log in</h2>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          name="email"
          value={email}
          type="text"
          className={s.input}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          value={password}
          type="password"
          className={s.input}
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" className={s.button}>
          Submit
        </Button>
      </form>
    </>
  );
};
