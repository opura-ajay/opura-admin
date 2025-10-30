import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voice = searchParams.get('voice') || 'alloy';
  const text =
    searchParams.get('text') || 'This is a preview of the selected voice.';

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('Missing OPENAI_API_KEY', { status: 500 });
  }

  // OpenAI TTS Audio generation
  // Model options: "gpt-4o-mini-tts" (example), adjust to what your account supports
  const resp = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      voice,
      input: text,
      format: 'mp3',
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    return new Response(`OpenAI TTS error: ${errText}`, { status: 500 });
  }

  const arrayBuffer = await resp.arrayBuffer();
  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  });
}