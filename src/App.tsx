import "./App.css";
import { Heading, Highlight, Skeleton } from "@chakra-ui/react";
import AllActivitiesCard from "./components/AllActivitiesCard";
import { useActivities } from "./hooks/useActivities";
import CurrentLeaderCard from "./components/CurrentLeaderCard";
import styles from "./styles/typography.module.css";

function App() {
  const { athleteData, isLoading } = useActivities();
  const athletesArray = Object.values(athleteData);

  return (
    <>
      <Heading size={{ base: "5xl", lg: "6xl" }} className={styles.title}>
        <Highlight query="for the win" styles={{ color: "#C3423F" }}>
          Leaderboard for the win
        </Highlight>
      </Heading>

      {isLoading ? (
        <Skeleton
          variant="shine"
          width="full"
          height="10"
          css={{
            "--start-color": "colors.pink.500",
            "--end-color": "colors.orange.500",
          }}
        />
      ) : (
        <>
          <CurrentLeaderCard athletes={athletesArray} />
          <AllActivitiesCard athletes={athletesArray} />
        </>
      )}
    </>
  );
}

export default App;
