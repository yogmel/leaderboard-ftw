import { Box, Flex, Heading, Table } from "@chakra-ui/react";
import type { RunningActivity } from "../services/processActivities";

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

        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Distance (km)
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {runningDataOne.map((item) => (
              <Table.Row key={item.date}>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell textAlign="end">{item.distance}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Box w="40%">
        <Heading>Macaco Bugio</Heading>

        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Distance (km)
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {runningDataTwo.map((item) => (
              <Table.Row key={item.date}>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell textAlign="end">{item.distance}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Flex>
  );
}

export default AllActivitiesCard;
