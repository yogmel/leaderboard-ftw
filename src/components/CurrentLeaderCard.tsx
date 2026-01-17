import {
  DataList,
  Flex,
  Heading,
  HStack,
  Image,
  Separator,
} from "@chakra-ui/react";
import BugioImg from "./../assets/growling-monkey.png";
import PandaImg from "./../assets/red-panda.png";
import styles from "./../styles/typography.module.css";
import currentLeaderCardStyles from "./currentLeaderCard.module.css";
import { truncateTwoDecimals } from "../utils/numberUtils";

interface TotalDistanceCardProps {
  totalOne: number;
  totalTwo: number;
}

function CurrentLeaderCard({ totalOne, totalTwo }: TotalDistanceCardProps) {
  const isOneWinner = totalOne > totalTwo;
  const difference = isOneWinner ? totalOne - totalTwo : totalTwo - totalOne;
  const imageSrc = isOneWinner ? PandaImg : BugioImg;
  const winnerText = isOneWinner ? "Panda Vermelho" : "Macaco Bugio";

  return (
    <Flex style={{ top: "-70px" }}>
      <Image src={imageSrc} style={{ width: "100%", maxWidth: "600px" }} />
      <div className={currentLeaderCardStyles.card}>
        <Heading size={"6xl"} className={styles.currentLeaderTitle}>
          Current Leader
        </Heading>
        <Heading size={"6xl"} className={styles.currentLeaderSubtitle}>
          {winnerText}
        </Heading>
        <Heading size={"2xl"}>+ {truncateTwoDecimals(difference)} km</Heading>
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
      </div>
    </Flex>
  );
}

export default CurrentLeaderCard;
