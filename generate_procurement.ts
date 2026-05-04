import { GoogleGenAI, Type } from "@google/genai";
import fs from 'fs';

async function generateProcurementContent() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompt = `
    Generate a 5-module project management course on 'Procurement' for a React application.
    The output must be a JSON object that fits into the following TypeScript interface:
    
    interface Lesson {
      id: string;
      title: string;
      type: 'video' | 'reading' | 'quiz' | 'exercise' | 'final_task';
      videoId?: string;
      transcript?: { startTime: number; endTime: number; text: string }[];
      content?: string;
    }

    interface QuizQuestion {
      q: string;
      opts: string[];
      ans: number;
    }

    The modules should be:
    1. Purchase Order Recovery Policy
    2. Procurement Plan
    3. Performance Report
    4. Catalogue Template (including AI Template Generator)
    5. Procurement Simulation Lab & AI Evaluator

    Include:
    - Detailed transcripts for 5 video lessons (one per module).
    - Each transcript should have at least 5 segments and include "AI Tool Tip" mentioning tools like Synthesia, HeyGen, Coursebox AI, etc.
    - A comprehensive reading lesson (id: 'r1') summarizing the course.
    - 50 multiple-choice questions (quizzes array) based on the content.

    Return ONLY the JSON object for the procurement category, starting from the 'lessons' and 'quizzes' properties.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  fs.writeFileSync('procurement_content.json', response.text);
  console.log('Content generated and saved to procurement_content.json');
}

generateProcurementContent();
