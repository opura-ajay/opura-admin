import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const voice = searchParams.get('voice') || 'alloy';
  const text =
    searchParams.get('text') || 'This is a preview of the selected voice.';

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set in environment variables');
    return new Response('Missing OPENAI_API_KEY - Please add it to your .env.local file', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  console.log('TTS Request - Voice:', voice, 'Text:', text.substring(0, 50));

  // OpenAI TTS Audio generation
  // Model options: "tts-1" (faster) or "tts-1-hd" (higher quality)
  const resp = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'tts-1',
      voice,
      input: text,
      response_format: 'mp3',
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    console.error('OpenAI TTS error:', resp.status, errText);
    
    if (resp.status === 401) {
      return new Response('Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env.local', { 
        status: 401,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    return new Response(`OpenAI TTS error: ${resp.status} - ${errText}`, { 
      status: resp.status,
      headers: { 'Content-Type': 'text/plain' }
    });
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