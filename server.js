
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Groq LLM endpoint
app.post('/ai/groq', async (req, res) => {
  try {
    const prompt = req.body.prompt || "";
    const apiKey = process.env.GROQ_API_KEY;
    const model = "llama3-8b-8192";

    if (!apiKey) return res.status(400).json({ error: "GROQ_API_KEY belum diset" });

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const j = await r.json();
    res.json(j);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.get("/", (req,res)=> res.send("Groq AI Server Running"));

app.listen(3000, ()=> console.log("Server berjalan di port 3000"));
