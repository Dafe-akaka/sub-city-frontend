import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button, Box, FormLabel } from "@chakra-ui/react";
import { auth } from "../../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import React from "react";

type Inputs = {
  email: string;
  Password: string;
};

export default function Signin() {
  const [firebaseErrorMessage, setFirebaseErrorMessage] =
    useState("not signed in");
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.Password)
      .then(() => {
        // Signed in
        //   const user = userCredential.user;
        //use useHistory to direct to dashboard
        setFirebaseErrorMessage("signed in");
        history.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseErrorMessage(errorMessage);
        // ..
      });
  };
  console.log(firebaseErrorMessage);

  return (
    <Box
      boxShadow="dark-lg"
      mt="300px"
      ml="-150px"
      p="8"
      rounded="md"
      bg="white"
      pos="absolute"
      top="50%"
      left="50%"
      display="flex"
    >
      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel> Email</FormLabel>
        {/* register your input into the hook by invoking the "register" function */}
        <Input placeholder="email" {...register("email", { required: true })} />
        <FormLabel mt="4"> Password</FormLabel>
        {/* include validation with required or other standard HTML validation rules */}
        <Input
          placeholder="password"
          type="password"
          {...register("Password", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.Password && <span>This field is required</span>}
        <Button type="submit" colorScheme="green" mt="4">
          Submit
        </Button>
        {firebaseErrorMessage && <Box color="red">{firebaseErrorMessage}</Box>}
        <FormLabel mt="4">
          Don't have an account? <Link to="/">Signup</Link>
        </FormLabel>
      </form>
    </Box>
  );
}
