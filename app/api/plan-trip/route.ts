import { TripDetails } from "@/lib/types";
import { preparePlanTripPrompt } from "@/lib/utils";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tripDetails: TripDetails = body.tripDetails;

    //check for required details
    if (!tripDetails.destination || !tripDetails.departure) {
      return new Response(
        JSON.stringify({
          error: "Please provide the destination and departure details.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    //prepare messages
    const messages: any = [
      {
        role: "system",
        content:
          "You are a precise and structured travel assistant. Your task is to generate a well-organized itinerary and a detailed budget estimate for a trip based on user-provided details.",
      },
      {
        role: "user",
        content: preparePlanTripPrompt(tripDetails),
      },
    ];

    //call open ai api to get the itenary and budget
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return new Response(response.choices[0].message.content, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error({ error });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
