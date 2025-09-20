import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    // ✅ Debug log
    console.log("Resume request received:", text);

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
                  text: `You are an expert career coach. Based on the following details:\n\n${text}\n\nGenerate a full professional resume in plain text with sections: Summary, Skills, Experience, Education, Projects.`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    // ✅ Debug log Gemini response
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Gemini API error: ${data.error?.message || "Unknown error"}`,
        }),
      };
    }

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Sorry, no resume could be generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.error("Server error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
