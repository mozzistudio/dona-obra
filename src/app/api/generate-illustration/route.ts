import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

const GEMINI_API_KEY = 'AIzaSyCV2cqYpZyfWE3kSVP-Aa1DaA3GwXrVpZk';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, filename } = await req.json();

    if (!prompt || !filename) {
      return NextResponse.json({ error: 'prompt and filename required' }, { status: 400 });
    }

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({ error: 'Gemini API failed', details: errorText }, { status: 500 });
    }

    const data = await response.json();

    // Extract image from response
    const candidates = data.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const base64 = part.inlineData.data;
          const buffer = Buffer.from(base64, 'base64');
          const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'webp';
          const filePath = path.join(process.cwd(), 'public', 'illustrations', `${filename}.${ext}`);

          await writeFile(filePath, buffer);

          return NextResponse.json({
            success: true,
            path: `/illustrations/${filename}.${ext}`,
            size: buffer.length,
          });
        }
      }
    }

    return NextResponse.json({ error: 'No image in response', data }, { status: 500 });
  } catch (error) {
    console.error('Error generating illustration:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
