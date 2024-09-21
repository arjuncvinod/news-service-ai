// import Groq from "groq-sdk";
// const apiKey = import.meta.env.VITE_GROQ_API_KEY;

// const groq = new Groq({ apiKey:apiKey , dangerouslyAllowBrowser: true });

// export async function translateText(text, targetLanguage) {
//   try {
//     const response = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: `Translate the following text into (send only the translated text without quotations on both sides) ${targetLanguage}: "${text}"`,
//         },
//       ],
//       model: "llama3-8b-8192",
//     });

//     return response.choices[0]?.message?.content || "No translation available.";
//   } catch (error) {
//     console.error("Error translating text:", error);
//     return "Translation failed.";
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAmfeEs2T6f8FsxElMrEjugDdNC1v73KPg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function translateText(text, targetLanguage) {

const prompt = `Translate the following text into (send only the translated text without quotations on both sides) ${targetLanguage}: "${text}"`
const result = await model.generateContent(prompt);
return (result.response.text());

}