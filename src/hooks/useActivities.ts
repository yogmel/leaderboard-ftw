import axios from "axios";
import { useState, useEffect } from "react";
import { getApiUrl } from "../api/config";
import { getTotalFromActivities } from "../services/processActivities";

export const useActivities = () => {
  const [totalOne, setTotalOne] = useState<number>(0); // red panda points
  const [totalTwo, setTotalTwo] = useState<number>(0); // growling monkey points

  const fetchActivities = async () => {
    const data = await axios.get(getApiUrl("activities"));

    const totalOne = getTotalFromActivities(data.data.dataOne);
    const totalTwo = getTotalFromActivities(data.data.dataTwo);

    return { totalOne, totalTwo };
  };

  useEffect(() => {
    fetchActivities().then((data) => {
      setTotalOne(data.totalOne);
      setTotalTwo(data.totalTwo);
    });
  }, []);

  return { totalOne, totalTwo };
};
