import { Button, Box } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../../App";
import { useHistory } from "react-router-dom";
import React from "react";

const Logout = () => {
  const history = useHistory();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("user is signed out");
        history.push("/signin");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Box>
      <Button
        variant="ghost"
        mb={2}
        onClick={handleSignout}
        type="button"
        colorScheme="red"
        mt="4"
      >
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
