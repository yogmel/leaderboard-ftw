import { Box, Flex, Heading } from "@chakra-ui/react";
import type { AthleteData } from "../hooks/useActivities";
import AllActivitiesTable from "./AllActivitiesTable";
import allActivitiesCardStyles from "./AllActivitiesCard.module.css";

interface AllActivitiesCardProps {
  athletes: AthleteData[];
}

function AllActivitiesCard({ athletes }: AllActivitiesCardProps) {
  return (
    <Flex
      justify="space-around"
      flexDirection={{ base: "column", lg: "row" }}
      className={allActivitiesCardStyles.card}
      // p="6"
    >
      {athletes.map((athlete) => (
        <Box w={{ lg: "40%" }} paddingBottom="30px" key={athlete.name}>
          <Heading>{athlete.name}</Heading>
          <AllActivitiesTable runningData={athlete.runningActivities} />
        </Box>
      ))}
    </Flex>
  );
}

export default AllActivitiesCard;
