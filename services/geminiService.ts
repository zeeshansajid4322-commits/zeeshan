import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SmartTimerResponse } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    durationSeconds: {
      type: Type.NUMBER,
      description: "The recommended duration for the timer in seconds.",
    },
    label: {
      type: Type.STRING,
      description: "A short, descriptive label for the timer activity.",
    },
    advice: {
      type: Type.STRING,
      description: "Brief, helpful advice or tip related to the activity (max 1 sentence).",
    },
  },
  required: ["durationSeconds", "label"],
};

export const getSmartTimerConfig = async (userPrompt: string): Promise<SmartTimerResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userPrompt,
      config: {
        systemInstruction: `You are an expert time management assistant. 
        Analyze the user's request to determine the optimal duration for a timer.
        If the user asks for "pomodoro", suggest 25 minutes (1500s).
        If the user mentions specific items (e.g., "soft boiled egg"), provide the precise cooking time.
        If the request is vague, estimate a reasonable default.`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as SmartTimerResponse;
  } catch (error) {
    console.error("Error fetching smart timer config:", error);
    throw error;
  }
};