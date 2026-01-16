import "./App.css";
import { Heading } from "@chakra-ui/react";
import TotalDistanceCard from "./components/TotalDistanceCard";
import { useActivities } from "./hooks/useActivities";

function App() {
  const { totalOne, totalTwo } = useActivities();

  return (
    <>
      <Heading>Leaderboard for running since 11/01/2026</Heading>
      <TotalDistanceCard totalOne={totalOne} totalTwo={totalTwo} />
    </>
  );
}

export default App;
