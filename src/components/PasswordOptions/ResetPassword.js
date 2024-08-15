import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import operations from "../../helpers/authOperations";

export const ResetPassword = () => {
  const { emailVerify } = operations;
  const [isVerify, setIsverify] = useState("");
  const VerificationToken = window.location.hash.split("#")[1];
  const navigate = useNavigate();


  // useEffect(() => {
  //   const VerificationToken = window.location.hash.split("#")[1];
  //   if (VerificationToken){

  //   }
  //   else
  //   return

  // }, []);


  useEffect(() => {
    verify(VerificationToken);
  }, []);

  const verify = async (token) => {
    console.log(isVerify);
    const isVerifySucces = await emailVerify(token);
    setIsverify(isVerifySucces);
    if (isVerifySucces === true) {
      setTimeout(() => {
        navigate("/RegisterPage/LogIn");
      }, 5000);
    }
  };

  return (
    <Container>
      <Section>
        <h2>Verification</h2>
        {isVerify === true ? (
          <p>{"Congrats, you succsesfully reset the password! New password is send for your email.You can log in to the app using it"}</p>
        ) : (
          <p>
            {
              "Password reset is not complete yet. Please try again or contact us if it isn`t work"
            }
          </p>
        )}
      </Section>

    </Container>
  );
};
