import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("jinaganda5@gmail.com");
  const secret = useInput("");
  const [requestSecretMutaion] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const [createAccountMutaion] = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: userName.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: secret.value,
      email: email.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutaion();
          if (!requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("Check your InBox for LogIn Secret");
            setAction("confirm");
          }
        } catch {
          toast.error("Can't request secret, Try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        userName.value !== "" &&
        email.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutaion();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now!");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field is required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          console.log(token);
        } catch {
          toast.error("Can't confirm secret");
        }
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
