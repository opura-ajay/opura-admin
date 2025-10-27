// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, config } = await req.json();

    // Build system prompt based on config
    const systemPrompt = buildSystemPrompt(config);

    const completion = await openai.chat.completions.create({
      model: config.model || 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({
      message: assistantMessage,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat request',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(config: any): string {
  let prompt = `You are ${config.botIdentity?.name || 'a helpful assistant'}`;

  if (config.botIdentity?.role) {
    prompt += `, a ${config.botIdentity.role}`;
  }

  if (config.botIdentity?.description) {
    prompt += `. ${config.botIdentity.description}`;
  }

  prompt += '\n\n';

  if (config.allowSlang) {
    const slangInstructions = {
      minimal: 'Use professional language with occasional casual phrases.',
      casual: 'Use casual, friendly language with common slang and emojis.',
      heavy:
        'Use informal language with frequent slang, abbreviations, and emojis.',
    } as const;

    type SlangLevel = keyof typeof slangInstructions;
    const level = (config?.slangLevel as SlangLevel) ?? 'minimal';
    const instruction = slangInstructions[level] ?? slangInstructions['minimal'];

    prompt += instruction + '\n';
  } else {
    prompt += 'Maintain a professional and formal tone.\n';
  }

  prompt += '\nProvide helpful, accurate, and concise responses.';

  return prompt;
}