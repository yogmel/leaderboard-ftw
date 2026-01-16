import axios from "axios";
import { useState, useEffect } from "react";
import { getApiUrl } from "../api/config";
import { getTotalFromActivities } from "../services/processActivities";

export const useActivities = () => {
  const [totalOne, setTotalOne] = useState<number>(0);
  const [totalTwo, setTotalTwo] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchActivities = async () => {
    const data = await axios.get(getApiUrl("activities"));
    const totalOne = getTotalFromActivities(data.data.dataOne);
    const totalTwo = getTotalFromActivities(data.data.dataTwo);
    return { totalOne, totalTwo };
  };

  useEffect(() => {
    fetchActivities()
      .then((data) => {
        setTotalOne(data.totalOne);
        setTotalTwo(data.totalTwo);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { totalOne, totalTwo, isLoading };
};
