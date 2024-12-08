import { useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import operations from "../../helpers/userProfileOperations";
import axios from "axios";

export const PasswordPage = () => {

  const navigate = useNavigate();
  const { getUserData } = operations;
  const [user, setUser] = useState("");
  
  
  
  useEffect(() => {
    const url = new URL(window.location);
    const token = url.hash.split("#")[1];
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
   try {
    const {data}= getUserData(setUser);
    console.log(data);
        setTimeout(() => {
 
      navigate("/ProfilePage/")
      window.location.reload()
      
    }, 5000);
    return;
  } catch (e) {
    console.log(e.message);
  }

},[])


  return (
    <Container>
      <Section>
        <h2>Password restore</h2>
        {user ? (
          <p>{`Congrats, ${user.login} you succsesfully log in the app! Please change your password using temporary code from email`}</p>
        ) : (
          <p>
            {
              "Something went wrong, the link lifetime may have expired. Please try again from begining or contact us if it isn`t work"
            }
          </p>
        )}
      </Section>
    </Container>
  );
};
