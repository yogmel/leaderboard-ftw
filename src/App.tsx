import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { truncateTwoDecimals } from "./utils/numberUtils";
import type { Activity } from "@intervals-icu/js-data-model";
import { getApiUrl } from "./api/config";

type Distance = {
  distance: number;
};

const filterDistance = (intervalsData: Activity[]): Distance[] =>
  intervalsData
    .filter((activity) => activity.type.toLowerCase().includes("run"))
    .map((activity) => ({ distance: activity.distance }));
const calculateTotal = (distances: Distance[]): number =>
  distances.reduce((initial, acc) => initial + acc.distance, 0);

function App() {
  const [totalOne, setTotalOne] = useState<number>(0); // red panda points
  const [totalTwo, setTotalTwo] = useState<number>(0); // growling monkey points

  console.log("env", import.meta.env.MODE);

  const update = (totalOne: number, totalTwo: number) => {
    setTotalOne(totalOne);
    setTotalTwo(totalTwo);
  };

  const fetchDataTwo = async () => {
    const data = await axios.get(getApiUrl("activities"));

    const a = filterDistance(data.data.dataOne);
    const b = filterDistance(data.data.dataTwo);

    const totalOne = calculateTotal(a);
    const totalTwo = calculateTotal(b);

    return { totalOne, totalTwo };
  };

  useEffect(() => {
    fetchDataTwo().then((data) => {
      update(data.totalOne, data.totalTwo);
    });
  }, []);
  return (
    <>
      <h1>Aloka</h1>
      <p>Panda Vermelho: {truncateTwoDecimals(totalOne / 1000)} km</p>
      <p>Macaco Bugio: {truncateTwoDecimals(totalTwo / 1000)} km</p>
    </>
  );
}

export default App;
