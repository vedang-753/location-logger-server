import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
// Allow CORS for Netlify + localhost
app.use(cors({
  origin: ["https://locationlogger.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

let locations = []; // in-memory storage (use DB in prod)

// Endpoint to receive location
app.post("/location", (req, res) => {
  const { lat, lon, timestamp } = req.body;
  if (lat && lon) {
    const entry = { lat, lon, timestamp: timestamp || Date.now() };
    locations.push(entry);
    console.log("📍 New location logged:", entry);
    res.json({ status: "ok" });
  } else {
    res.status(400).json({ error: "Invalid payload" });
  }
});

// Endpoint to view logged locations
app.get("/locations", (req, res) => {
  res.json(locations);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
