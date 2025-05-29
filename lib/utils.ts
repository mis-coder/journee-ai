import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TripDetails } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prepareAnalyzeQueryPrompt = (userPrompt: string) => {
  return `Extract the trip details from user prompt surrounded by triple ticks. 
        If a field is not mentioned or unclear, leave it out. Do not guess, assume, or invent defaults.
        User Prompt: '''${userPrompt}'''`;
};

export const extractTripDetailsFunction = () => {
  const properties = {
    destination: {
      type: "string",
      description: "City or place to visit",
    },
    departure: {
      type: "string",
      description: "City or place of departure",
    },
    start_date: {
      type: ["string", "null"],
      format: "date",
      description: "Trip start date (YYYY-MM-DD)",
    },
    trip_duration: {
      type: ["integer", "null"],
      description: "Length of the trip in days",
    },
    budget: {
      type: ["string", "null"],
      description: "Approximate total budget (e.g. '2000 USD')",
    },
    travel_type: {
      type: ["string", "null"],
      enum: ["leisure", "business", "adventure", "cultural", "romantic"],
      description: "Purpose of travel",
    },
    trip_type: {
      type: ["string", "null"],
      enum: ["solo", "couple", "family", "friends", "group"],
      description: "Type of trip",
    },
  };

  return {
    name: "extract_trip_details",
    description: "extracts the trip details in a given json format.",
    strict: true,
    parameters: {
      type: "object",
      properties,
      required: [
        "destination",
        "departure",
        "start_date",
        "trip_duration",
        "budget",
        "travel_type",
        "trip_type",
      ],
      additionalProperties: false,
    },
  };
};

export const preparePlanTripPrompt = (tripDetails: TripDetails): string => {
  return `Trip Details (in JSON format) are enclosed within triple backticks:
         \`\`\`${JSON.stringify(tripDetails)}\`\`\`
        Instructions:
        1. If a "budget" is provided in the trip details, ensure the itinerary fits within that budget.
        2. Respect "currency", "trip_type" and "travel_type" if given. 
        For example: - trip_type: "solo", travel_type: "leisure" ⇒ The itinerary should be relaxed and not hectic.
        3. Generate only 1 to 3 activities per day depending on the travel_type and trip_type.

        Respond with a JSON object that has exactly two top-level keys:
        - "itenary"
        - "budget"

        ---

        **1. "itenary"**: A daily breakdown of the trip.

        Format:
        \`\`\`json
        "itenary": {
          "day_1": {
            "activities": [
              {
                "activity": "Visit Eiffel Tower",
                "time": "morning",
                "location": "Eiffel Tower, Paris"
              }
            ],
            "temperature": "23°C"
          },
          "day_2": {
            "activities": [
              {
                "activity": "Louvre Museum Tour",
                "time": "afternoon",
                "location": "Louvre Museum, Paris"
              },
              {
                "activity": "Seine River Cruise",
                "time": "evening",
                "location": "Port de la Bourdonnais"
              }
            ],
            "temperature": "22°C"
          }
        }
        \`\`\`

      Each day must contain:
      - 1–3 activities
      - time of day (e.g. morning, afternoon, evening)
      - location
      - daily average temperature
      ---

      **2. "budget"**: A detailed cost breakdown in USD.

      Format:
      \`\`\`json
      "budget": {
        "flights": {
          "estimate": 500,
          "description": "Round-trip economy flight"
        },
        "stay": {
          "estimate": 600,
          "description": "Hotel stay: $100 per night × 6 nights"
        },
        "food": {
          "estimate": 180,
          "description": "$30 per day × 6 days"
        },
        "local_transport": {
          "estimate": 90,
          "description": "Public transport + occasional taxi"
        },
        "activities": {
          "estimate": 120,
          "description": "Entry fees and local experiences"
        },
        "miscellaneous": {
          "estimate": 100,
          "description": "Shopping, tips, etc."
        }
      }
      \`\`\`

      All budget items must include:
      - "estimate": numerical cost in given currency
      - "description": brief explanation of how cost was calculated

      Respond only with a single JSON object matching this structure.`;
};
