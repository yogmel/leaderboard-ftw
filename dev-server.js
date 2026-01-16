import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchActivities } from "./src/api/fetchActivities.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/activities", async (req, res) => {
  console.log("Function called with method:", req.method);
  console.log("Query params:", req.query);

  try {
    const result = await fetchActivities({
      athleteIdOne: process.env.VITE_ATHLETE_ID_ONE || "",
      athleteIdTwo: process.env.VITE_ATHLETE_ID_TWO || "",
      apiKeyOne: process.env.API_KEY_ONE || "",
      apiKeyTwo: process.env.API_KEY_TWO || "",
    });

    if (result.success) {
      return res.status(200).json(result.data);
    }

    return res.status(result.error?.status || 500).json(result.error);
  } catch (error) {
    console.error("Error in activities endpoint:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Dev API server running on http://localhost:${PORT}`);
});
