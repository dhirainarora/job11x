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
                  text: `You are an expert career coach. Based on the following details:\n\n${text}\n\nGenerate a full professional resume in plain text. 
                  Format it with clear sections:
                  1. Summary
                  2. Skills
                  3. Experience
                  4. Education
                  5. Projects

                  Make sure it looks like a real resume, not just bullet points.`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Sorry, no resume could be generated. Please try again.";

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
