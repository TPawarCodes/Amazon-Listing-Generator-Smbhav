import { GoogleGenerativeAI } from '@google/generative-ai';
import { config, validateConfig } from './config';
import type { ListingData } from '../types';

validateConfig();

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export async function generateListing(content: string): Promise<ListingData> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate an Amazon product listing based on this social media content: ${content}. 
                 Format the response as strict and valid JSON with the following structure:
                 {
                   "title": "product title",
                   "description": "detailed description",
                   "bulletPoints": ["point1", "point2", "point3", "point4", "point5"],
                   "keywords": ["keyword1", "keyword2", "keyword3"]
                 }
                 Double-check that all string fields use double quotes, and the JSON is properly escaped.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const parsed = JSON.parse(text) as Partial<ListingData>;

      if (
        !parsed.title ||
        !parsed.description ||
        !Array.isArray(parsed.bulletPoints) ||
        !Array.isArray(parsed.keywords)
      ) {
        throw new Error('Invalid response structure from AI');
      }

      return {
        title: parsed.title,
        description: parsed.description,
        bulletPoints: parsed.bulletPoints,
        keywords: parsed.keywords,
      };
    } catch (parseError) {
      throw new Error(text);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`AI Generation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
}
