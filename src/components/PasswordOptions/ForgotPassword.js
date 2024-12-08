import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import operations from "../../helpers/authOperations";

export const  ForgotPassword = () => {
  const token = window.location.hash.split("#")[1];
  const navigate = useNavigate();
  


  useEffect(() => {
    if (token){
      console.log(token);
      // localStorage.setItem("token", token);
    }
    else
    return

  }, []);


  // const verify = async (token) => {
  //   console.log(isVerify);
  //   const isVerifySucces = await emailVerify(token);
  //   setIsverify(isVerifySucces);
  //   if (isVerifySucces === true) {
  //     setTimeout(() => {
  //       navigate("/RegisterPage/LogIn");
  //     }, 5000);
  //   }
  // };

  return (
    <Container>
      <Section>
        <h2>Verification</h2>
        {token === true ? (
          <p>{"Congrats, you succsesfully log in the app! Please change your password usin temporary code from email."}</p>
        ) : (
          <p>
            {
              "Something went wrong, the link lifetime may have expired. Please try again fron begining or contact us if it isn`t work"
            }
          </p>
        )}
      </Section>

    </Container>
  );
};
