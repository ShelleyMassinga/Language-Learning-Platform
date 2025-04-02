import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log("API key loaded:", process.env.OPENAI_API_KEY?.slice(0, 8));

  try {
    const body = await req.json();
    const { message, language, difficulty, showGrammarCorrection } = body;

    const languageMap: Record<string, string> = {
      lang_en: 'English',
      lang_pt: 'Portuguese',
      lang_sw: 'Swahili',
    };

    const languageName = languageMap[language] || 'English';

    // 🔥 Updated prompt
    const prompt = `
You are an AI conversation partner helping someone practice ${languageName} at a ${difficulty} level.

1. First, respond to the user's message conversationally in ${languageName}.
2. Then, if the user's original message has grammar mistakes, provide a correction or improvement.
3. If the message is already correct, say: "No correction needed."

User's message: "${message}"
`.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const response = completion.choices[0].message?.content || 'No response.';
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'OpenAI failed' }, { status: 500 });
  }
}
