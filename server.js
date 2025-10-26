const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const keysFile = path.join(__dirname, 'data', 'keys.json');

function loadKeys() {
  if (!fs.existsSync(keysFile)) {
    return { adminKey: 'change-me-admin', accessCodes: [] };
  }
  const data = fs.readFileSync(keysFile);
  return JSON.parse(data);
}

function saveKeys(data) {
  fs.writeFileSync(keysFile, JSON.stringify(data, null, 2));
}

app.post('/login', (req, res) => {
  const { code } = req.body || {};
  const data = loadKeys();
  const { accessCodes } = data;
  if (!code) return res.status(400).json({ success: false, message: 'No code provided' });
  if (accessCodes.includes(code)) {
    return res.json({ success: true, message: '✅ Access granted' });
  } else {
    return res.status(401).json({ success: false, message: '❌ Invalid code' });
  }
});

app.post('/admin/login', (req, res) => {
  const { adminKey } = req.body || {};
  const data = loadKeys();
  if (!adminKey) return res.status(400).json({ success: false, message: 'No adminKey provided' });
  if (adminKey === data.adminKey) {
    return res.json({ success: true, accessCodes: data.accessCodes });
  } else {
    return res.status(401).json({ success: false, message: '❌ Wrong admin key' });
  }
});

app.post('/admin/update', (req, res) => {
  const { adminKey, newCodes } = req.body || {};
  const data = loadKeys();
  if (!adminKey) return res.status(400).json({ success: false, message: 'No adminKey provided' });
  if (adminKey === data.adminKey) {
    data.accessCodes = Array.isArray(newCodes) ? newCodes : [];
    saveKeys(data);
    return res.json({ success: true, message: '✅ Access codes updated' });
  } else {
    return res.status(401).json({ success: false, message: '❌ Unauthorized admin key' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('PakStream server running on port', PORT));
