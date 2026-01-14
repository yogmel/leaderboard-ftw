import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type ICU_Partial = {
  type: string;
  distance: number;
};

type Distance = {
  distance: number;
};

function truncateTwoDecimals(num: number) {
  return Math.trunc(num * 100 + 1e-8) / 100;
}

function App() {
  const [somaUm, setSomaUm] = useState<number>(0);
  const [somaDois, setSomaDois] = useState<number>(0);

  const update = (somaUm: number, somaDois: number) => {
    setSomaUm(somaUm);
    setSomaDois(somaDois);
  };

  const fetchDataTwo = async () => {
    const data = await axios.get("/.netlify/functions/intervals");

    console.log("data", data.data.dataOne);

    const a: Distance[] = data.data.dataOne
      .filter((m: ICU_Partial) => m.type === "Run" || m.type === "VirtualRun")
      .map((m: ICU_Partial) => ({ distance: m.distance }));

    const b: Distance[] = data.data.dataTwo
      .filter((m: ICU_Partial) => m.type === "Run" || m.type === "VirtualRun")
      .map((m: ICU_Partial) => ({ distance: m.distance }));

    const somaUm = b.reduce((initial, acc) => {
      return initial + acc.distance;
    }, 0);

    const somaDois = a.reduce((initial, acc) => {
      return initial + acc.distance;
    }, 0);

    return { somaUm, somaDois };
  };

  useEffect(() => {
    fetchDataTwo().then((data) => {
      update(data.somaUm, data.somaDois);
    });
  }, []);
  return (
    <>
      <h1>Aloka</h1>
      <p>Macaco Bugio: {truncateTwoDecimals(somaUm / 1000)} km</p>
      <p>Panda Vermelho: {truncateTwoDecimals(somaDois / 1000)} km</p>
    </>
  );
}

export default App;
