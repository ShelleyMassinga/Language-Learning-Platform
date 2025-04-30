import { NextResponse } from 'next/server';
import { v2 } from '@google-cloud/translate';

const translate = new v2.Translate({
  projectId: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function POST(req: Request) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    const [translation] = await translate.translate(text, {
      from: sourceLang,
      to: targetLang,
    });

    return NextResponse.json({ translation });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
} 