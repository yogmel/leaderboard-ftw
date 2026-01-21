import "./App.css";
import { Heading, Highlight, Skeleton } from "@chakra-ui/react";
import AllActivitiesCard from "./components/AllActivitiesCard";
import { useActivities } from "./hooks/useActivities";
import CurrentLeaderCard from "./components/CurrentLeaderCard";
import styles from "./styles/typography.module.css";
import { useCountdown } from "./hooks/useCountdown";

function App() {
  const {
    remainingDate: { days, hours },
    targetDate: { day, month, year },
  } = useCountdown();
  const { athleteData, isLoading } = useActivities();
  const athletesArray = Object.values(athleteData);

  return (
    <>
      <Heading
        size={{ base: "5xl", lg: "6xl" }}
        paddingTop={"6"}
        className={styles.title}
      >
        <Highlight query="for the win" styles={{ color: "#C3423F" }}>
          Leaderboard for the win
        </Highlight>
      </Heading>
      <Heading size={{ base: "lg", lg: "2xl" }} color="#858585">
        Countdown: {days} days {hours} hours ({day}/{month}/{year})
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
