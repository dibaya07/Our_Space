require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const createResourceRouter = require("./routes/resourceRouter");
const { connectMongo } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = new Set([
  process.env.CLIENT_ORIGIN || "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5174",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* ================= AUTH ================= */
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

/* ================= RESOURCES ================= */
app.use("/api/couple", createResourceRouter("couples"));
app.use("/api/love-notes", createResourceRouter("loveNotes"));
app.use("/api/bucket", createResourceRouter("buckets"));
app.use("/api/timeline", createResourceRouter("timeline"));
app.use("/api/memory", createResourceRouter("memoryBox"));
app.use("/api/mood", createResourceRouter("mood"));
app.use("/api/analytics", createResourceRouter("analytics"));
app.use("/api/healing", createResourceRouter("healing"));
app.use("/api/playtime", createResourceRouter("playtime"));

/* ================= HEALTH ================= */
app.get("/health", (req, res) =>
  res.json({ ok: true, uptime: process.uptime() })
);

connectMongo()
  .then(() => {
    console.log("DB ready");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(() => {
    console.log("DB failed, using fallback");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  });
