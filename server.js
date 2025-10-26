import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 🔧 Absolute path setup (works on Vercel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keysPath = path.join(__dirname, "data", "keys.json");

// 🔐 Read keys file safely
let keys = { adminKey: "", accessCodes: [] };
try {
  const rawData = fs.readFileSync(keysPath, "utf8");
  keys = JSON.parse(rawData);
  console.log("✅ Keys loaded successfully");
} catch (err) {
  console.error("❌ Error reading keys.json:", err.message);
}

// 🟢 API route for user access
app.post("/api/access", (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ success: false, msg: "No access code provided." });

  if (keys.accessCodes.includes(code)) {
    return res.json({ success: true, msg: "Access granted." });
  } else {
    return res.status(401).json({ success: false, msg: "Invalid access code." });
  }
});

// 🔵 API route for admin panel
app.post("/api/admin", (req, res) => {
  const { key } = req.body;

  if (!key) return res.status(400).json({ success: false, msg: "No admin key provided." });

  if (key === keys.adminKey) {
    return res.json({ success: true, msg: "Admin access granted." });
  } else {
    return res.status(401).json({ success: false, msg: "Invalid admin key." });
  }
});

// 🟣 Serve static files from /public folder
app.use(express.static(path.join(__dirname, "public")));

// 🟠 Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Export (required for Vercel)
export default app;
