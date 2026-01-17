import axios from "axios";
import { useState, useEffect } from "react";
import { getApiUrl } from "../api/config";
import {
  getTotalFromActivities,
  mapActivities,
  type RunningActivity,
} from "../services/processActivities";
import BugioImg from "./../assets/growling-monkey.png";
import PandaImg from "./../assets/red-panda.png";
import { truncateTwoDecimals } from "../utils/numberUtils";

export interface AthleteData {
  runningActivities: RunningActivity[];
  total: number;
  img: string;
  name: string;
}

interface UseActivities {
  athleteData: Record<string, AthleteData>;
  isLoading: boolean;
}

const isCached = import.meta.env.MODE === "cached";

const DATA_KEYS = ["panda", "bugio"] as const;
const ATHLETE_CONFIG = {
  panda: { img: PandaImg, name: "Panda Vermelho" },
  bugio: { img: BugioImg, name: "Macaco Bugio" },
} as const;

export const useActivities = (): UseActivities => {
  const [athleteData, setAthleteData] = useState<Record<string, AthleteData>>(
    Object.fromEntries(
      DATA_KEYS.map((key) => [
        key,
        {
          runningActivities: [],
          total: 0,
          img: ATHLETE_CONFIG[key].img,
          name: ATHLETE_CONFIG[key].name,
        },
      ])
    )
  );
  const [isLoading, setIsLoading] = useState<boolean>(!isCached);

  const fetchActivities = async () => {
    const response = await axios.get(getApiUrl("activities"));

    return Object.fromEntries(
      DATA_KEYS.map((key) => {
        const runningActivities = mapActivities(response.data[key]);
        const total = truncateTwoDecimals(
          getTotalFromActivities(runningActivities)
        );
        return [
          key,
          {
            runningActivities,
            total,
            img: ATHLETE_CONFIG[key].img,
            name: ATHLETE_CONFIG[key].name,
          },
        ];
      })
    );
  };

  useEffect(() => {
    if (!isCached) {
      fetchActivities()
        .then((data) => {
          setAthleteData(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return { athleteData, isLoading };
};
