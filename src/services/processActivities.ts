import type { Activity } from "@intervals-icu/js-data-model";
import dayjs from "dayjs";
import { transformToKm } from "../utils/numberUtils";

export interface RunningActivity {
  date: string;
  distance: number;
  type: string;
}

const filterRunningActivities = (intervalsData: Activity[]): Activity[] =>
  intervalsData.filter((activity) =>
    activity.type.toLowerCase().includes("run")
  );

export const mapActivities = (intervalsData: Activity[]): RunningActivity[] => {
  return filterRunningActivities(intervalsData).map((activity) => ({
    date: dayjs(activity.start_date).format("DD/MM/YYYY"),
    distance: transformToKm(activity.icu_distance),
    type: activity.type,
  }));
};

export const getTotalFromActivities = (
  runningActivities: RunningActivity[]
): number =>
  runningActivities
    .map((activity) => ({ distance: activity.distance }))
    .reduce((initial, acc) => initial + acc.distance, 0);
