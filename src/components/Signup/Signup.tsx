import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button, Box, FormLabel } from "@chakra-ui/react";
import { auth } from "../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import React from "react";

type Inputs = {
  email: string;
  Password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.Password !== data.confirmPassword) {
      return setFirebaseErrorMessage("Passwords do not match");
    }

    createUserWithEmailAndPassword(auth, data.email, data.Password)
      .then(() => {
        setFirebaseErrorMessage("");
        history.push("/signin");
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
      transform="translate(-50%,-50%)"
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
        <FormLabel mt="4"> Confirm Password</FormLabel>
        <Input
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword", { required: true, min: 4 })}
        />
        {errors.Password && <span>This field is required</span>}
        <Button type="submit" colorScheme="red" mt="4">
          Submit
        </Button>
        {firebaseErrorMessage && <Box color="red">{firebaseErrorMessage}</Box>}
        <FormLabel mt="4">
          Already have an account? <Link to="/signin">Signin</Link>
        </FormLabel>
      </form>
    </Box>
  );
}
