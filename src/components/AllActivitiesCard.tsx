import { Box, Flex, Heading, Table } from "@chakra-ui/react";
import type { RunningActivity } from "../services/processActivities";
import AllActivitiesTable from "./AllActivitiesTable";

interface AllActivitiesCardProps {
  runningDataOne: RunningActivity[];
  runningDataTwo: RunningActivity[];
}

function AllActivitiesCard({
  runningDataOne,
  runningDataTwo,
}: AllActivitiesCardProps) {
  return (
    <Flex justify="space-around">
      <Box w="40%">
        <Heading>Panda Vermelho</Heading>
        <AllActivitiesTable runningData={runningDataOne} />
      </Box>
      <Box w="40%">
        <Heading>Macaco Bugio</Heading>
        <AllActivitiesTable runningData={runningDataTwo} />
      </Box>
    </Flex>
  );
}

export default AllActivitiesCard;
