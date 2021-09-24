import { Button} from "@chakra-ui/react";
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
      })
      .catch((error) => {});
  };

  return (
    <div >
      <Button
        variant="ghost"
        mb={2}
        onClick={handleSignout}
        type="button"
        colorScheme="black"
        mt="3"
        size="lg"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
