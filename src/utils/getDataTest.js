export const testGetData = () => {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; // Make sure this matches your OpenRouter API key
//   const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      models: ['anthropic/claude-3.5-sonnet', 'gryphe/mythomax-l2-13b'],
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that generates structured logbook entries for students based on given keywords and entry types. Each entry should be professional, well-written, and formatted properly.",
        },
        {
          role: "user",
          content:
            "Generate a daily logbook entry using these keywords: authentication, Firebase, React Native. Keep it clear, concise, and relevant to a student’s daily logbook.",
        },
      ],
      temperature: 0.7,
    }),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      // "HTTP-Referer": "http://localhost:5173/", // Required by OpenRouter (set your actual site)
      // "X-Title": "Logbook Generator", // Optional, but helps track usage
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.choices[0].message.content);
    //   const result = data.choices[0].message.content;
    //   return result;
    })
    .catch((error) => console.error("Error generating logbook entry:", error));
};
