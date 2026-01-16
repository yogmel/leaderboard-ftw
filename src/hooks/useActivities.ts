import axios from "axios";
import { useState, useEffect } from "react";
import { getApiUrl } from "../api/config";
import { getTotalFromActivities } from "../services/processActivities";

const isCached = import.meta.env.MODE === "cached";
const defaultTotalOne = 23000;
const defaultTotalTwo = 22000;

export const useActivities = () => {
  const [totalOne, setTotalOne] = useState<number>(
    isCached ? defaultTotalOne : 0
  );
  const [totalTwo, setTotalTwo] = useState<number>(
    isCached ? defaultTotalTwo : 0
  );
  const [isLoading, setIsLoading] = useState<boolean>(!isCached);

  const fetchActivities = async () => {
    const data = await axios.get(getApiUrl("activities"));
    const totalOne = getTotalFromActivities(data.data.dataOne);
    const totalTwo = getTotalFromActivities(data.data.dataTwo);
    return { totalOne, totalTwo };
  };

  useEffect(() => {
    if (!isCached) {
      fetchActivities()
        .then((data) => {
          setTotalOne(data.totalOne);
          setTotalTwo(data.totalTwo);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return { totalOne, totalTwo, isLoading };
};
