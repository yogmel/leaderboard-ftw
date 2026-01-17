import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { getApiUrl } from "../api/config";
import {
  getTotalFromActivities,
  mapActivities,
  type RunningActivity,
} from "../services/processActivities";

interface UseActivities {
  runningDataOne: RunningActivity[];
  runningDataTwo: RunningActivity[];
  totalOne: number;
  totalTwo: number;
  isLoading: boolean;
}

const isCached = import.meta.env.MODE === "cached";
// const defaultTotalOne = 23000;
// const defaultTotalTwo = 22000;

export const useActivities = (): UseActivities => {
  const [runningDataOne, setRunningDataOne] = useState<RunningActivity[]>([]);
  const [runningDataTwo, setRunningDataTwo] = useState<RunningActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!isCached);

  const fetchActivities = async () => {
    const data = await axios.get(getApiUrl("activities"));

    const runningActivitiesOne = mapActivities(data.data.dataOne);
    const runningActivitiesTwo = mapActivities(data.data.dataTwo);

    return {
      runningDataOne: runningActivitiesOne,
      runningDataTwo: runningActivitiesTwo,
    };
  };

  useEffect(() => {
    if (!isCached) {
      fetchActivities()
        .then((data) => {
          setRunningDataOne(data.runningDataOne);
          setRunningDataTwo(data.runningDataTwo);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const totalOne = useMemo(() => {
    return getTotalFromActivities(runningDataOne);
  }, [runningDataOne]);

  const totalTwo = useMemo(() => {
    return getTotalFromActivities(runningDataTwo);
  }, [runningDataTwo]);

  return { runningDataOne, totalOne, runningDataTwo, totalTwo, isLoading };
};
