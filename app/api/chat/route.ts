import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are here to help me sove ai agent questions.' },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content || 'No response';
    return NextResponse.json({ reply });
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', `WX - err: ${JSON.stringify(err)}`)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
