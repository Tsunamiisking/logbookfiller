import axios from "axios";

const BASE_URL = "https://chatgpt-42.p.rapidapi.com/aitohuman";

export const generateLogbookEntry = async (keywords, entryType) => {
  try {
    const systemPrompt = `You are an AI assistant that generates structured logbook entries for students based on given keywords and entry types. Each entry should be professional, well-written, and formatted properly.`;

    const userPrompt = `Generate a ${entryType.toLowerCase()} logbook entry using these keywords: ${keywords.join(", ")}. Keep it clear, concise, and relevant to a student’s daily logbook.`;

    const options = {
      method: 'POST',
      url: BASE_URL,
      headers: {
        'x-rapidapi-key': '7a6ecc6af8msh0dbcd40cd404a18p12049djsna3eab1055eef',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        messages: [
          { role: "user", content: `${systemPrompt} ${userPrompt}` }
        ],
        web_access: false
      })
    };

    const response = await axios.request(options);
    console.log(response.data);

    return response.data.result || "No result returned";
  } catch (error) {
    console.error("Error generating logbook entry:", error.response?.data || error);
    return "Error: Unable to generate logbook entry.";
  }
};


// import OpenAI from 'openai';

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: `${API_KEY}`,
//   dangerouslyAllowBrowser: true,
//   defaultHeaders: {
//     // 'HTTP-Referer': '<YOUR_SITE_URL>', // Optional.
//     // 'X-Title': '<YOUR_SITE_NAME>', // Optional.
//   },
// });


// export const generateLogbookEntry = async (keywords, entryType) => {
//   const systemPrompt = `You are an AI assistant that generates structured logbook entries for students based on given keywords and entry types. Each entry should be professional, well-written, and formatted properly.`;

// const userPrompt = `Generate a ${entryType.toLowerCase()} logbook entry using these keywords: ${keywords.join(", ")}. Keep it clear, concise, and relevant to a student’s daily logbook.`;
//   const completion = await openai.chat.completions.create({
//     model: 'openai/gpt-4o',
//     messages: [
//       {
//         role: 'system',
//         content: systemPrompt,
//       },
//       {
//         role: 'user',
//         content: userPrompt,
//       },
//     ],
//   });

//   return completion.choices[0].message.content;
// }

// async function main() {
//   const task = 'Implemented authentication with Firebase in the React Native app';
//   const logEntry = await generateLogBookEntry(task);
//   console.log(logEntry);
// }

// main();

//  generateLogBookEntry()
