import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
  margin-left: 5px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  setAction,
  userName,
  firstName,
  lastName,
  email,
  secret,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>Log In | Prisamgram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"Email"}
              value={email.value}
              onChange={email.onChange}
              type="email"
            />
            <Button text={"Log In"} />
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>Sign Up | Prisamgram</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"Username"}
              value={userName.value}
              onChange={userName.onChange}
            />
            <Input
              placeholder={"First name"}
              value={firstName.value}
              onChange={firstName.onChange}
            />
            <Input
              placeholder={"Last name"}
              value={lastName.value}
              onChange={lastName.onChange}
            />
            <Input
              placeholder={"Email"}
              value={email.value}
              onChange={email.onChange}
              type="email"
            />
            <Button text={"Sign Up"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Paste your secret"
            required
            value={secret.value}
            onChange={secret.onChange}
          />
          <Button text={"Confirm"} />
        </form>
      )}
    </Form>
    {action !== "confirm" && (
      <>
        <Helmet>
          <title>Confirm Secret | Prisamgram</title>
        </Helmet>
        <StateChanger>
          {action === "logIn" ? (
            <>
              Don't have an account?{" "}
              <Link onClick={() => setAction("signUp")}>Sign up</Link>
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link onClick={() => setAction("logIn")}>Log in</Link>
            </>
          )}
        </StateChanger>
      </>
    )}
  </Wrapper>
);
