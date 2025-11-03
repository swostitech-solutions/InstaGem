
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateCaption = async (imageBase64: string, mimeType: string): Promise<string> => {
  if (!API_KEY || !ai) {
    return "⚠️ API key not configured. Please add your Gemini API key to the .env file and restart the server.";
  }

  try {
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const textPart = {
      text: "Write a short, engaging Instagram caption for this image. Feel free to use a conversational tone and include 1-3 relevant hashtags at the end."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating caption with Gemini:", error);
    return "Sorry, I couldn't come up with a caption right now. Please try again.";
  }
};
