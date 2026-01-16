import "./App.css";
import { Heading, Highlight } from "@chakra-ui/react";
import TotalDistanceCard from "./components/TotalDistanceCard";
import { useActivities } from "./hooks/useActivities";
import CurrentLeaderCard from "./components/CurrentLeaderCard";
import styles from "./styles/typography.module.css";

function App() {
  const { totalOne, totalTwo } = useActivities();

  return (
    <>
      <Heading size={"6xl"} className={styles.title}>
        <Highlight query="for the win" styles={{ color: "#C3423F" }}>
          Leaderboard for the win
        </Highlight>
      </Heading>

      <CurrentLeaderCard totalOne={totalOne} totalTwo={totalTwo} />

      <TotalDistanceCard totalOne={totalOne} totalTwo={totalTwo} />
    </>
  );
}

export default App;
