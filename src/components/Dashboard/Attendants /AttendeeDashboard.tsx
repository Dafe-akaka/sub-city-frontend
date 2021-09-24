import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Text,
  HStack,
  Checkbox,
  Input,
  Box,
  useColorModeValue,
  Flex,
  Center,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Card } from "./Card";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { Property } from "./Property";

type EventParams = {
  id: string;
};

export interface Event {
  event_id: number;
  organiser_name: string;
  date_of_event: string;
  num_of_attendees: number;
  total_cost: number;
  description: string;
  time_of_event: string;
}

export default function AttendeeDashboard() {
  let { id } = useParams<EventParams>();
  const [attendeeName, SetAttendeeName] = useState("");
  const [organiserName, setOrganiserName] = useState("");
  const [dateOfEvent, setDateOfEvent] = useState("");
  const [numOfAttendees, setnumOfAttendees] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [description, setDescription] = useState("");
  const [timeOfEvent, setTimeOfEvent] = useState("");
  const [attending, setAttending] = useState(false);

  const costPerPerson = (totalCost / numOfAttendees).toFixed(2);

  const fetchEventLink = `${process.env.REACT_APP_API_LOCATION}/event-info/${id}`;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const fetchEventInfo = await fetch(fetchEventLink);
        const jsonData: Event[] = await fetchEventInfo.json();
        const eventInfo: Event = jsonData[0];

        setOrganiserName(eventInfo.organiser_name);
        setDateOfEvent(eventInfo.date_of_event);
        setnumOfAttendees(eventInfo.num_of_attendees);
        setTotalCost(eventInfo.total_cost);
        setDescription(eventInfo.description);
        setTimeOfEvent(eventInfo.time_of_event);
      } catch (err) {
        console.error(err.message);
      }
    };

    getEvent();
  }, [fetchEventLink]);

  const handleSubmitAttendeeName = async () => {
    function intoPennies(number: string) {
      let convertToString = number.replace(/[^a-zA-Z0-9]/g, "");

      return Number(convertToString);
    }

    const costInPennies = intoPennies(costPerPerson);

    const body = { attendeeName, costInPennies };

    const sendAttendeeInfo = await fetch(
      `${process.env.REACT_APP_API_LOCATION}/attendee/buy/${id}`,
      {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const redirect = await sendAttendeeInfo.text();
    window.location.href = redirect; //to stripe
  };

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
        <Box
          as="section"
          bg={useColorModeValue("gray.100", "inherit")}
          py="12"
          px={{ md: "8" }}
        >
          <Card>
            <CardHeader title="Event Information" />
            <CardContent>
              <Property label="Organisor" value={organiserName} />
              <Property label="Date" value={dateOfEvent?.slice(0, 10)} />
              <Property label="Time" value={timeOfEvent} />
              <Property label="Description" value={description} />
              <Center>
                <HStack p= "4">
                  <Checkbox
                    colorScheme="green"
                    size="md"
                    mr= "5"
                    isInvalid
                    ischecked={attending}
                    onChange={(e) => setAttending(e.target.checked)}
                  >
                    Attending Event
                  </Checkbox>

                  <Text fontSize="l" ml="7">
                    Cost:
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "GBP",
                    }).format(Number(costPerPerson))}
                  </Text>
                </HStack>
              </Center>
            </CardContent>
            {attending && (
              <Center>
                <HStack p="7">
                  <Input
                    placeholder="Attendee Name"
                    w="50%"
                    ml="2"
                    value={attendeeName}
                    onChange={(e) => SetAttendeeName(e.target.value)}
                  ></Input>
                  <Button
                    onClick={() => handleSubmitAttendeeName()}
                    leftIcon={<ArrowForwardIcon />}
                    colorScheme="yellow"
                    variant="solid"
                    ml="8"
                  >
                    Transfer Money
                  </Button>
                </HStack>
              </Center>
            )}
          </Card>
        </Box>
      </div>
    </div>
  );
}
