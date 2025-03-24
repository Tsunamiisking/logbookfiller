import axios from 'axios';

export const generateLogbookEntry = async (keywords, entryType) => {
  const BASE_URL = "https://chatgpt-42.p.rapidapi.com/aitohuman";
  try {
    const systemPrompt = `You are a professional AI assistant that generates structured and formal logbook entries for SIWESS(Students' Industrial Work Experience Scheme,a Nigerian program designed to bridge the gap between theory and practice in higher education by providing students with practical skills and experience in industrial settings) students. Your entries should be concise, clear, and formatted in a professional manner.`;

    const userPrompt = `Generate a ${entryType.toLowerCase()} logbook entry using these keywords: ${keywords.join(", ")}. The logbook entry should include:
    
    - A clear summary of the day's activities
    - A structured format with paragraphs and bullet points where necessary
    - Professional language without slang or informal expressions`;

    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4o',
      headers: {
        'x-rapidapi-key': '7a6ecc6af8msh0dbcd40cd404a18p12049djsna3eab1055eef',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        web_access: false
      }
    }

    const response = await axios.request(options);
    return response.data.result?.trim() || "No valid response received.";
  } catch (error) {
    console.error("Error generating logbook entry:", error.response?.data || error);
    return "Error: Unable to generate logbook entry.";
  }
};
