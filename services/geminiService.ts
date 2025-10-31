
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const generateAdTags = async (adBody: string, adTitle: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    // Return mock tags if API key is not available
    return ["Mock Tag", "AI Analysis", "Creative"];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Analyze the following ad creative content. Based on the title and body, generate a list of 5-7 relevant tags.
      The tags should cover the ad's theme, sentiment, format, and industry.
      Return the tags as a simple comma-separated string.

      Title: "${adTitle}"
      Body: "${adBody}"

      Example output: E-commerce, Fashion, Positive Sentiment, Summer Sale, Product Promotion, Video Ad
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text;
    if (text) {
      return text.split(',').map(tag => tag.trim());
    }
    return [];
  } catch (error) {
    console.error("Error generating ad tags with Gemini API:", error);
    // Return fallback tags on error
    return ["API Error", "Tagging Failed"];
  }
};
