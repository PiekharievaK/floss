import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Section from "../../components/Section";
import operations from "../../helpers/authOperations";

export const Verification = () => {
  const { emailVerify } = operations;
  const [isVerify, setIsverify] = useState("");
  const VerificationToken = window.location.hash.split("#")[1];
  const navigate = useNavigate();
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
          <p>{"Congrats,  you email is verify? you can log in to app now"}</p>
        ) : (
          <p>
            {
              "Verification is not complete yet, this link is not work. Please try again or contact us"
            }
          </p>
        )}
      </Section>
    </Container>
  );
};
