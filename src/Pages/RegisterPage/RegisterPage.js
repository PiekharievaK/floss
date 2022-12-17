import { Registration } from "../../components/Registration/Registration";
import { LoginForm } from "../../components/Login/Login";
import { useState } from "react";
import Container from "../../components/Container"
import Button from "../../components/Button";
import s from "./RegisterPage.module.scss"

export const RegisterPage = ({
  signUpUser,
  logInUser,
  setUser,
  setIsLoggedIn,
}) => {
  const [regisrtation, setRegistration] = useState();

  const handleChange = (e) => {
    setRegistration(e.target.id);
  };

  return (
    <Container>
      <h1>RegisterPage</h1>
      <div className={s.buttonBox}>
        <Button id={"login"} onClick={handleChange} className={s.button}>
          Login
        </Button>
        <Button id={"signup"} onClick={handleChange} className={s.button}>
          Signup
        </Button>
      </div>
      {regisrtation === "signup" && <Registration signUpUser={signUpUser} />}
      {regisrtation === "login" && (
        <LoginForm
          logInUser={logInUser}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </Container>
  );
};
