import { HStack, DataList, Separator } from "@chakra-ui/react";
import { Fragment, type FC } from "react";
import type { AthleteData } from "../hooks/useActivities";

interface TotalDataListProps {
  athletes: AthleteData[];
}

const TotalsDataList: FC<TotalDataListProps> = ({ athletes }) => {
  return (
    <HStack
      mt="2"
      gap="4"
      justifyContent={{ base: "center", lg: "flex-start" }}
    >
      {athletes.map((athlete, index) => (
        <Fragment key={athlete.name}>
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>{athlete.name}</DataList.ItemLabel>
              <DataList.ItemValue>{athlete.total} km</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          {index < athletes.length - 1 && (
            <Separator orientation="vertical" height="4" key={`sep-${index}`} />
          )}
        </Fragment>
      ))}
    </HStack>
  );
};

export default TotalsDataList;
