const MODEL_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate";

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt || "";
    if (!prompt) return { statusCode: 400, body: JSON.stringify({ error: "Missing prompt" }) };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) };

    const payload = {
      prompt: { text: prompt },
      temperature: 0.7,
      candidateCount: 1,
      maxOutputTokens: 600
    };

    const resp = await fetch(MODEL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return { statusCode: resp.status, body: JSON.stringify({ error: txt }) };
    }

    const data = await resp.json();
    let answer = "";

    if (data.candidates && data.candidates.length > 0) {
      if (data.candidates[0].output) answer = data.candidates[0].output;
      else if (data.candidates[0].content) {
        answer = data.candidates[0].content.parts?.map(p => p.text).join("\n") || JSON.stringify(data.candidates[0].content);
      }
    } else if (data.output) {
      answer = data.output;
    } else {
      answer = JSON.stringify(data).slice(0, 2000);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ answer })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
  }
};
