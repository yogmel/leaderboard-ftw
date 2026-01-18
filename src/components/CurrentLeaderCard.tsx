import { Flex, Heading, Image } from "@chakra-ui/react";
import styles from "./../styles/typography.module.css";
import currentLeaderCardStyles from "./currentLeaderCard.module.css";
import { truncateTwoDecimals } from "../utils/numberUtils";
import TotalsDataList from "./TotalsDataList";
import type { AthleteData } from "../hooks/useActivities";

interface CurrentLeaderCardProps {
  athletes: AthleteData[];
}

function CurrentLeaderCard({ athletes }: CurrentLeaderCardProps) {
  // Find the athlete with the highest total
  const winner = athletes.reduce((prev, current) =>
    current.total > prev.total ? current : prev
  );

  // Find the second place (runner-up)
  const runnerUp = athletes
    .filter((athlete) => athlete !== winner)
    .reduce((prev, current) => (current.total > prev.total ? current : prev));

  const difference = winner.total - runnerUp.total;

  return (
    <Flex flexDirection={{ base: "column", lg: "row" }}>
      <Image src={winner.img} style={{ width: "100%", maxWidth: "600px" }} />
      <div className={currentLeaderCardStyles.card}>
        <Heading
          size={{ base: "4xl", lg: "6xl" }}
          className={styles.currentLeaderTitle}
        >
          Current Leader
        </Heading>
        <Heading
          size={{ base: "4xl", lg: "6xl" }}
          className={styles.currentLeaderSubtitle}
        >
          {winner.name}
        </Heading>
        <Heading size={"2xl"}>+ {truncateTwoDecimals(difference)} km</Heading>
        <TotalsDataList athletes={athletes} />
      </div>
    </Flex>
  );
}

export default CurrentLeaderCard;
