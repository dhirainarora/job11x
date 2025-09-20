export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    // ✅ Check if API key is being passed correctly
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Gemini API Key length:", apiKey ? apiKey.length : "MISSING");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert career coach. Based on the following candidate details:\n\n${text}\n\nGenerate a full professional resume. 
                  Format it with clear sections:
                  - Summary
                  - Skills
                  - Experience
                  - Education
                  - Projects

                  The resume must look like a real one, not bullet notes.`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();
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
