import {
  extractTripDetailsFunction,
  prepareAnalyzeQueryPrompt,
} from "@/lib/utils";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userPrompt = body.userPrompt;

    // validate the user prompt
    if (!userPrompt || typeof userPrompt !== "string") {
      return new Response(JSON.stringify({ error: "Invalid User Prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    //create messages array
    const messages: any = [
      {
        role: "system",
        content:
          "You are a travel assistant that extracts trip details from user queries.",
      },
      {
        role: "user",
        content: prepareAnalyzeQueryPrompt(userPrompt),
      },
    ];

    //call open ai api to extract details from user prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      tools: [
        {
          type: "function",
          function: extractTripDetailsFunction,
        },
      ],
    });

    const toolCalls = response.choices[0].message?.tool_calls;

    if (toolCalls) {
      return new Response(toolCalls[0]?.function?.arguments, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error({ error });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
