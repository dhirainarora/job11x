import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert career coach. Write an ATS-optimized resume for a candidate with this info:\n${text}\nOutput in clean markdown format.`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();
    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no resume could be generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
