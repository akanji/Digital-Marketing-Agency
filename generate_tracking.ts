import { GoogleGenAI, Type } from "@google/genai";
import * as fs from 'fs';

async function generateProjectTrackingContent() {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const model = genAI.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Generate a 5-module project management course on 'Project Tracking'.
    Subjects:
    1. RACI Matrix.
    2. Root Cause Analysis.
    3. Gap Analysis.
    4. Execution Tracking.
    5. RAID Log.
    
    Include:
    - Detailed content for each subject (around 200 words each).
    - 50 multiple-choice questions with 4 options each and the correct answer index (0-3).
    - Video transcripts for 3 video lessons (around 100 words each).
    
    Return the result as a JSON object with the following structure:
    {
      "lessons": [
        { "id": "t1", "title": "RACI Matrix Mastery", "type": "video", "videoId": "dQw4w9WgXcQ", "transcript": [...] },
        { "id": "t2", "title": "Root Cause Analysis Techniques", "type": "video", "videoId": "dQw4w9WgXcQ", "transcript": [...] },
        { "id": "t3", "title": "Gap Analysis & Execution Tracking", "type": "video", "videoId": "dQw4w9WgXcQ", "transcript": [...] },
        { "id": "t4", "title": "Interactive RACI Builder", "type": "exercise", "content": "Build your own RACI matrix for a sample project." },
        { "id": "t5", "title": "AI Root Cause Analyzer Tool", "type": "exercise", "content": "Use AI to identify the root cause of project delays." },
        { "id": "r1", "title": "Project Tracking: RAID Logs & Gap Analysis", "type": "reading", "content": "..." }
      ],
      "quizzes": [
        { "q": "...", "opts": ["...", "...", "...", "..."], "ans": 0 },
        ... (50 questions)
      ]
    }`,
    config: {
      responseMimeType: "application/json",
    }
  });

  const response = await model;
  fs.writeFileSync('project_tracking_content.json', response.text);
  console.log('Project tracking content generated successfully.');
}

generateProjectTrackingContent();
