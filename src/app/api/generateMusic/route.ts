import { NextRequest, NextResponse } from 'next/server';
import { generateMusic } from '@/lib/gpt4o-client';

export async function POST(req: NextRequest) {
  try {
    const { prompt, genre, title } = await req.json();

    // 打印请求信息
    console.log("Received request with the following data:");
    console.log("Prompt:", prompt);
    console.log("Genre:", genre);
    console.log("Title:", title);

    const result = await generateMusic(
      prompt,
      genre,
      title,
      {
        customMode: true,
        instrumental: true,
        model: "V3_5",
        callBackUrl: "/",
        negativeTags: ""
      }
    );

    // 打印结果信息
    console.log("Generated music result:", result);

    if (!result || typeof result !== 'object') {
      throw new Error('Invalid music generation result');
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating music:", error);
    return NextResponse.json(
      { message: 'Failed to generate music' },
      { status: 500 }
    );
  }
}