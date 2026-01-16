import { Handler } from "@netlify/functions";
import { fetchActivities } from "../../src/api/fetchActivities";

export const handler: Handler = async (event) => {
  console.log("Function called with method:", event.httpMethod);
  console.log("Query params:", event.queryStringParameters);

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const result = await fetchActivities({
    athleteIdOne: process.env.VITE_ATHLETE_ID_ONE || "",
    athleteIdTwo: process.env.VITE_ATHLETE_ID_TWO || "",
    apiKeyOne: process.env.API_KEY_ONE || "",
    apiKeyTwo: process.env.API_KEY_TWO || "",
  });

  if (result.success) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    };
  }

  return {
    statusCode: result.error?.status || 500,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.error),
  };
};
