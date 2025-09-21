import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_tvNLk_XWpo_qgNhIPj65SQIsG6hQtGGgXMqhBlcSorI_mUWOasupR5ioLyEIeRlN/exec";

app.post("/api/login", async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text); // Try parsing JSON
    } catch (err) {
      console.error("Google Script did not return JSON:", text);
      return res.status(500).json({ error: "Google Script did not return JSON" });
    }

    console.log("Google Script response status:", response.status);
    res.json(data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => console.log("Proxy server running at http://localhost:5000"));
