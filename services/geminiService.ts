
import { GoogleGenAI, Type } from '@google/genai';
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A concise summary of the client's project request in 2-3 sentences."
        },
        complexity: {
            type: Type.STRING,
            description: "An estimated complexity level for the project. Can be 'Low', 'Medium', or 'High'."
        },
        clarifyingQuestions: {
            type: Type.ARRAY,
            description: "A list of 3 important and concise questions to ask the client to better understand the project scope and requirements.",
            items: { type: Type.STRING }
        }
    },
    required: ["summary", "complexity", "clarifyingQuestions"]
};

export const analyzeProjectRequest = async (service: string, details: string): Promise<AnalysisResult | null> => {
    try {
        const prompt = `
            Analyze the following freelance project request. The client is interested in my "${service}" services.
            Based on their message, provide a concise summary, estimate the project complexity, and suggest three clarifying questions I should ask them.

            Client's Message:
            ---
            ${details}
            ---
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: analysisSchema,
                temperature: 0.5,
            }
        });
        
        const jsonText = response.text.trim();
        if (!jsonText) {
             throw new Error("Received empty response from API");
        }
        
        const result: AnalysisResult = JSON.parse(jsonText);
        return result;

    } catch (error) {
        console.error("Error analyzing project request:", error);
        // Return a structured error message for the UI
        return {
            summary: "Could not analyze the request.",
            complexity: "Unknown",
            clarifyingQuestions: ["There was an issue connecting to the AI service. Please try again later or contact me directly via email."]
        };
    }
};
