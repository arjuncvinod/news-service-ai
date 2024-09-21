import Groq from "groq-sdk";
const apiKey = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({ apiKey:apiKey , dangerouslyAllowBrowser: true });

export async function SummariseText(text) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `summarise this following text: "${text}" (send only the summary text as response,do not change the meaning of the text)`,
        },
      ],
      model: "llama3-8b-8192",
    });

    return response.choices[0]?.message?.content || "No summarisation available.";
  } catch (error) {
    console.error("Error summarising text:", error);
    return "Summarisation failed.";
  }
}

// (async () => {
//   const text = "Fast language models are essential for various applications because they can process large amounts of text in real time.";
//   const targetLanguage = "malayalam";

//   const translatedText = await translateText(text, targetLanguage);
//   console.log( translatedText);
// })();
export default SummariseText