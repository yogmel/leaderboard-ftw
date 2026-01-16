import type { Activity } from "@intervals-icu/js-data-model";

export const getTotalFromActivities = (intervalsData: Activity[]) =>
  intervalsData
    .filter((activity) => activity.type.toLowerCase().includes("run"))
    .map((activity) => ({ distance: activity.distance }))
    .reduce((initial, acc) => initial + acc.distance, 0);
