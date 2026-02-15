module.exports = (req, res) => {
  try {
    const codes = ["12345", "99999", "abcde"]; // hardcoded test codes

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const { code } = JSON.parse(body || "{}");

      if (codes.includes(code)) {
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, message: "Access granted" }));
      } else {
        res.statusCode = 401;
        res.end(JSON.stringify({ success: false, message: "Access denied" }));
      }
    });

  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Server error" }));
  }
};
