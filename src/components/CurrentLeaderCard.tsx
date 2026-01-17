import { Flex, Heading, Image } from "@chakra-ui/react";
import BugioImg from "./../assets/growling-monkey.png";
import PandaImg from "./../assets/red-panda.png";
import styles from "./../styles/typography.module.css";
import currentLeaderCardStyles from "./currentLeaderCard.module.css";
import { truncateTwoDecimals } from "../utils/numberUtils";
import TotalsDataList from "./TotalsDataList";

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
        <TotalsDataList totalOne={totalOne} totalTwo={totalTwo} />
      </div>
    </Flex>
  );
}

export default CurrentLeaderCard;
