import { GoogleGenerativeAI } from '@google/generative-ai';
import { config, validateConfig } from './config';
import type { ListingData } from '../types';

validateConfig();

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

export async function generateListing(content: string): Promise<ListingData> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
      Analyze this social media post URL: ${content}
      
      Generate a comprehensive Amazon product listing with the following information:
      1. Product Title (max 200 characters)
      2. Key Benefits (5 bullet points)
      3. Product Description (detailed paragraph)
      4. Target Audience
      5. Brand Name
      6. Category
      7. Search Keywords (comma-separated)
      
      Format the response as a JSON object with these exact keys:
      {
        "title": "",
        "benefits": [],
        "description": "",
        "targetAudience": "",
        "brand": "",
        "category": "",
        "keywords": ""
      }
      
      Ensure the content is professional, SEO-friendly, and follows Amazon's style guidelines.
    `;

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
