import { Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [attendant, setAttendant] = useState("");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    const getEvent = async () => {
      try {
        const fetchEventInfo = await fetch(
          `${process.env.REACT_APP_API_LOCATION}/order/success?session_id=${params.session_id}`
        );
        const jsonData = await fetchEventInfo.text();
        setAttendant(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getEvent();
  }, [params.session_id]);

  return (
    <div>
     <Flex bg="gray.300">
        <Box top="1rem" right="1rem" align="center" mt="2">
          <Text fontSize="40px" color="black">
            Sub-city
          </Text>
        </Box>
      </Flex>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Text fontSize="4xl">
          Thank you {attendant}, your payment was a success.
        </Text>
      </div>
    </div>
  );
}
