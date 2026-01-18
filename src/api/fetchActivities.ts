import axios, { AxiosError } from "axios";
import { type Activity } from "@intervals-icu/js-data-model";

interface FetchActivitiesParams {
  athleteIdOne: string;
  athleteIdTwo: string;
  apiKeyOne: string;
  apiKeyTwo: string;
  oldestDate?: string;
}

interface FetchActivitiesResult {
  success: boolean;
  data?: {
    panda: Activity[];
    bugio: Activity[];
  };
  error?: {
    message: string;
    status?: number;
    details?: any;
  };
}

export async function fetchActivities(
  params: FetchActivitiesParams
): Promise<FetchActivitiesResult> {
  const {
    athleteIdOne,
    athleteIdTwo,
    apiKeyOne,
    apiKeyTwo,
    oldestDate = "2026-01-11",
  } = params;

  try {
    const fullUrlOne = `https://intervals.icu/api/v1/athlete/${athleteIdOne}/activities?oldest=${oldestDate}`;
    const fullUrlTwo = `https://intervals.icu/api/v1/athlete/${athleteIdTwo}/activities?oldest=${oldestDate}`;

    console.log("Calling URL:", fullUrlOne);
    console.log("Calling URL:", fullUrlTwo);

    const [responseOne, responseTwo] = await Promise.all([
      axios.get<Activity[]>(fullUrlOne, {
        auth: {
          username: "API_KEY",
          password: apiKeyOne,
        },
      }),
      axios.get<Activity[]>(fullUrlTwo, {
        auth: {
          username: "API_KEY",
          password: apiKeyTwo,
        },
      }),
    ]);

    console.log("Success! Status:", responseOne.status);

    return {
      success: true,
      data: {
        panda: responseOne.data,
        bugio: responseTwo.data,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error("Error details:", {
      message: axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });

    return {
      success: false,
      error: {
        message: axiosError.message || "Failed to fetch data",
        status: axiosError.response?.status,
        details: axiosError.response?.data,
      },
    };
  }
}
