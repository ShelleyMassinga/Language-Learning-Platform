// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Language code mapping
const languageMap: { [key: string]: string } = {
  'lang_en': 'English',
  'lang_pt': 'Portuguese',
  'lang_sw': 'Swahili',
};

// Difficulty level prompts
const difficultyPrompts: { [key: string]: string } = {
  beginner: "Use simple vocabulary and basic grammar structures. Keep responses short and clear.",
  intermediate: "Use more complex vocabulary and grammar structures. Provide more detailed responses.",
  advanced: "Use advanced vocabulary and complex grammar structures. Engage in deeper conversations.",
};

export async function POST(request: Request) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json({ 
        error: "API key missing" 
      }, { status: 500 });
    }

    const body = await request.json();
    const { message, language, difficulty, showGrammarCorrection } = body;
    
    if (!message || !language) {
      return NextResponse.json(
        { error: 'Message and language are required' },
        { status: 400 }
      );
    }

    // Use try-catch specifically for the OpenAI API call
    const systemPrompt = `You are a helpful language learning assistant. 
    Respond in ${languageMap[language] || language}.
    ${difficultyPrompts[difficulty as keyof typeof difficultyPrompts] || difficultyPrompts.beginner}
    ${showGrammarCorrection ? 'If the user makes grammar mistakes, provide corrections in a friendly way.' : ''}
    Keep responses natural and conversational.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: `Failed to process request: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}