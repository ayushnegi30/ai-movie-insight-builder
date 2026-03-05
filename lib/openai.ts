import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function analyzeReviewsWithAI(reviews: string[]) {
  if (!reviews?.length) {
    return {
      summary: "No audience reviews available.",
      sentiment: "mixed",
      themes: [],
    }
  }

  const combinedReviews = reviews.slice(0, 5).join("\n\n")

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a movie sentiment analyst. Always return valid JSON only.",
        },
        {
          role: "user",
          content: `
Analyze the following movie audience reviews.

Return strictly JSON:
{
  "summary": "Short summary",
  "sentiment": "positive | mixed | negative",
  "themes": ["theme1", "theme2"]
}

Reviews:
${combinedReviews}
          `,
        },
      ],
      temperature: 0.4,
    })

    const responseText =
      completion.choices?.[0]?.message?.content || "{}"
      console.log("Groq raw response:", completion)

    const jsonMatch = responseText.match(/\{[\s\S]*\}/)

    if (!jsonMatch) throw new Error("Invalid JSON from AI")

    return JSON.parse(jsonMatch[0])

  } catch (error) {
    console.error("Groq AI failed:", error)

    return {
      summary:
        "AI analysis temporarily unavailable. Audience reactions appear varied.",
      sentiment: "mixed",
      themes: [],
    }
  }
}