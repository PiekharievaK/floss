// import { Registration } from "../../components/Registration/Registration";
// import { LoginForm } from "../../components/Login/Login";
import { useEffect} from "react";
import Container from "../../components/Container"
import Section from "../../components/Section";
// import Button from "../../components/Button";
import { NavLink, Outlet, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
// import { RedirectFunction } from "react-router-dom";
import s from "./RegisterPage.module.scss"


export const RegisterPage = ({
  signUpUser,
  logInUser,
  setUser,
  setIsLoggedIn,
}) => {
  const isDark = useSelector((state) => state.theme.isDark);
  const navigate = useNavigate()
  
  useEffect(()=>{
    // if(window.location.pathname !== "/RegisterPage/LogIn" || window.location.pathname !== "/RegisterPage/SignUp"){
  if(window.location.pathname === "/RegisterPage" ){
    navigate('/RegisterPage/LogIn')
  }
}, [])



  const getLinkClassName = ({ isActive }) =>
isActive ? (isDark?s.active__linkDark :s.active__link ) : (isDark?s.linkDark :s.link );

  return (
    <Container>
      <h1>Registration Page</h1>
      <div className={s.linkBox}>
        <NavLink to="logIn" className={getLinkClassName}>Log In</NavLink>
        <NavLink to="SignUp" className={getLinkClassName}>Sign Up</NavLink>
      </div>
      <Section>

     <Outlet/>
      </Section>
    </Container>
  );
};
