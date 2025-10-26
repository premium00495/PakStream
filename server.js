import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Helper to get current directory (ESM style)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Load keys from data/keys.json
const keysFile = path.join(__dirname, "data", "keys.json");
let keys = JSON.parse(fs.readFileSync(keysFile, "utf-8"));

// Verify Access Key
app.post("/verify", (req, res) => {
  const { key } = req.body;
  if (keys.includes(key)) {
    res.json({ success: true, message: "Access granted!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid key" });
  }
});

// Default route → serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Catch-all route (for SPA or unknown routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
