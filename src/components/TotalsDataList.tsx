import { HStack, DataList, Separator } from "@chakra-ui/react";
import type { FC } from "react";

interface TotalDataListProps {
  totalOne: number;
  totalTwo: number;
}

const TotalsDataList: FC<TotalDataListProps> = ({ totalOne, totalTwo }) => {
  return (
    <HStack mt="2" gap="4">
      <DataList.Root orientation="horizontal">
        <DataList.Item key={"Panda Vermelho"}>
          <DataList.ItemLabel>{"Panda Vermelho"}</DataList.ItemLabel>
          <DataList.ItemValue>{totalOne} km</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>

      <Separator orientation="vertical" height="4" />

      <DataList.Root orientation="horizontal">
        <DataList.Item key={"Macaco Bugio"}>
          <DataList.ItemLabel>{"Macaco Bugio"}</DataList.ItemLabel>
          <DataList.ItemValue>{totalTwo} km</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    </HStack>
  );
};

export default TotalsDataList;
