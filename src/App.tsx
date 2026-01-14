import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const fetchData = async () => {
    const athleteId = import.meta.env.VITE_ATHLETE_ID_ONE;
    const athleteIdTwo = import.meta.env.VITE_ATHLETE_ID_TWO;
    const key = import.meta.env.VITE_API_KEY_ONE;
    const keyTwo = import.meta.env.VITE_API_KEY_TWO;
    const url = `https://intervals.icu/api/v1/athlete/${athleteId}/activities?oldest=2026-01-01`;
    const urlTwo = `https://intervals.icu/api/v1/athlete/${athleteIdTwo}/activities?oldest=2026-01-01`;

    const data = await axios.get(url, {
      auth: {
        username: "API_KEY",
        password: key,
      },
    });

    const dataTwo = await axios.get(urlTwo, {
      auth: {
        username: "API_KEY",
        password: keyTwo,
      },
    });

    const a = data.data
      .filter((m) => m.type === "Run" || m.type === "VirtualRun")
      .map((m) => ({ distance: m.distance }));

    const b = dataTwo.data
      .filter((m) => m.type === "Run" || m.type === "VirtualRun")
      .map((m) => ({ distance: m.distance }));

    console.log("a", a);
    console.log("b", b);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Aloka</h1>
    </>
  );
}

export default App;
