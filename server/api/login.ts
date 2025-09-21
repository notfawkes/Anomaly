import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaS4dwDTQmMIY5eQFIzjThTdizrlEBdRxdUs1dxSEqBj7r1FEfOiAmzaWGLiGLpFvWqg/exec";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const allowedOrigin = "https://anomaly-sigai-p3c5ys5lb-notfawkes-projects.vercel.app";

    if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end(); // 204 No Content is better for preflight
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Google Script did not return JSON:", text);
      return res.status(500).json({ error: "Google Script did not return JSON" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error proxying request:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
