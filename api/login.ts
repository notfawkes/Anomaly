import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_tvNLk_XWpo_qgNhIPj65SQIsG6hQtGGgXMqhBlcSorI_mUWOasupR5ioLyEIeRlN/exec";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Preflight for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    if (!text) {
      console.error("Empty response from Google Script");
      return res.status(500).json({ error: "Empty response from Google Script" });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Google Script did not return valid JSON:", text);
      return res.status(500).json({ error: "Google Script did not return valid JSON", raw: text });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

