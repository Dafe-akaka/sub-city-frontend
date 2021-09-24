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
        setFirebaseErrorMessage("");
        history.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseErrorMessage(errorMessage);
      });
  };

  return (
    <Box
      boxShadow="dark-lg"
      p="8"
      rounded="md"
      bg="white"
      pos="fixed"
      top="50%"
      left="50%"
      display="flex"
      transform= "translate(-50%,-50%)"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel> Email</FormLabel>
        <Input placeholder="email" {...register("email", { required: true })} />
        <FormLabel mt="4"> Password</FormLabel>
        <Input
          placeholder="password"
          type="password"
          {...register("Password", { required: true })}
        />
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
