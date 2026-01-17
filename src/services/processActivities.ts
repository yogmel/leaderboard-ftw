import type { Activity } from "@intervals-icu/js-data-model";
import dayjs from "dayjs";
import { transformToKm, truncateTwoDecimals } from "../utils/numberUtils";

export interface RunningActivity {
  date: string;
  distance: number;
  type: string;
  partial: number;
}

const filterRunningActivities = (intervalsData: Activity[]): Activity[] =>
  intervalsData.filter((activity) =>
    activity.type.toLowerCase().includes("run")
  );

export const mapActivities = (intervalsData: Activity[]): RunningActivity[] => {
  const filtered = filterRunningActivities(intervalsData);
  let runningTotal = 0;

  return filtered
    .reverse()
    .map((activity) => {
      runningTotal += transformToKm(activity.icu_distance);

      return {
        date: dayjs(activity.start_date).format("DD/MM/YYYY"),
        distance: transformToKm(activity.icu_distance),
        type: activity.type,
        partial: truncateTwoDecimals(runningTotal),
      };
    })
    .reverse();
};

export const getTotalFromActivities = (
  runningActivities: RunningActivity[]
): number =>
  runningActivities
    .map((activity) => ({ distance: activity.distance }))
    .reduce((initial, acc) => initial + acc.distance, 0);
