import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log(API_KEY);
const BASE_URL = "https://api.openai.com/v1/chat/completions";

export const generateLogbookEntry = async (keywords, entryType) => {
  try {
    const systemPrompt = `You are an AI assistant that generates structured logbook entries for students based on given keywords and entry types. Each entry should be professional, well-written, and formatted properly.`;

    const userPrompt = `Generate a ${entryType.toLowerCase()} logbook entry using these keywords: ${keywords.join(", ")}. Keep it clear, concise, and relevant to a student’s daily logbook.`;

    const response = await axios.post(
      BASE_URL,
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating logbook entry:", error);
    return "Error: Unable to generate logbook entry.";
  }
};
