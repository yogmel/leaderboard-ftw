import "./App.css";
import { Heading, Highlight, Skeleton } from "@chakra-ui/react";
import AllActivitiesCard from "./components/AllActivitiesCard";
import { useActivities } from "./hooks/useActivities";
import CurrentLeaderCard from "./components/CurrentLeaderCard";
import styles from "./styles/typography.module.css";
import { truncateTwoDecimals } from "./utils/numberUtils";

function App() {
  const { totalOne, totalTwo, runningDataOne, runningDataTwo, isLoading } =
    useActivities();

  return (
    <>
      <Heading size={"6xl"} className={styles.title}>
        <Highlight query="for the win" styles={{ color: "#C3423F" }}>
          Leaderboard for the win
        </Highlight>
      </Heading>

      {isLoading ? (
        <Skeleton
          variant="shine"
          width="full"
          height="20"
          css={{
            "--start-color": "colors.pink.500",
            "--end-color": "colors.orange.500",
          }}
        />
      ) : (
        <>
          <CurrentLeaderCard
            totalOne={truncateTwoDecimals(totalOne)}
            totalTwo={truncateTwoDecimals(totalTwo)}
          />
          <AllActivitiesCard
            runningDataOne={runningDataOne}
            runningDataTwo={runningDataTwo}
          />
        </>
      )}
    </>
  );
}

export default App;
