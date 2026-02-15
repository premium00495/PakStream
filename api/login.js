const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const { code } = req.body || {};

    const filePath = path.join(process.cwd(), "data", "keys.json");
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);

    if (data.codes && data.codes.includes(code)) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
