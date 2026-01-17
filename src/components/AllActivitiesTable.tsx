import { Table } from "@chakra-ui/react";
import type { RunningActivity } from "../services/processActivities";
import type { FC } from "react";

interface AllActivitiesTableProps {
  runningData: RunningActivity[];
}

const AllActivitiesTable: FC<AllActivitiesTableProps> = ({ runningData }) => {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Date</Table.ColumnHeader>
          <Table.ColumnHeader>Type</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Distance (km)</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">
            Partial total (km)
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {runningData.map((item) => (
          <Table.Row key={item.date}>
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell textAlign="end">{item.distance}</Table.Cell>
            <Table.Cell textAlign="end">{item.partial}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default AllActivitiesTable;
