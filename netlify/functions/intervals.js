const axios = require("axios");

exports.handler = async (event, context) => {
  console.log("Function called with method:", event.httpMethod);
  console.log("Query params:", event.queryStringParameters);
  console.log("API Secret exists:", !!process.env.INTERVALS_API_SECRET);

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const fullUrlOne = `https://intervals.icu/api/v1/athlete/${process.env.VITE_ATHLETE_ID_ONE}/activities?oldest=2026-01-11`;
    const fullUrlTwo = `https://intervals.icu/api/v1/athlete/${process.env.VITE_ATHLETE_ID_TWO}/activities?oldest=2026-01-11`;

    console.log("Calling URL:", fullUrlOne);
    console.log("Calling URL:", fullUrlTwo);

    const responseOne = await axios.get(fullUrlOne, {
      auth: {
        username: "API_KEY",
        password: process.env.API_KEY_ONE,
      },
    });

    const responseTwo = await axios.get(fullUrlTwo, {
      auth: {
        username: "API_KEY",
        password: process.env.API_KEY_TWO,
      },
    });

    console.log("Success! Status:", responseOne.status);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataOne: responseOne.data,
        dataTwo: responseTwo.data,
      }),
    };
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return {
      statusCode: error.response?.status || 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Failed to fetch data",
        message: error.message,
        details: error.response?.data,
      }),
    };
  }
};
