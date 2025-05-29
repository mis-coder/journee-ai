export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

enum TravelType {
  Leisure = "leisure",
  Business = "business",
  Adventure = "adventure",
  Cultural = "cultural",
  Romantic = "romantic",
}

enum TripType {
  Solo = "solo",
  Couple = "couple",
  Family = "family",
  Friends = "friends",
  Group = "group",
}

export interface TripDetails {
  destination: string;
  departure: string;
  start_date: string;
  trip_duration: number;
  budget: number | null;
  travel_type: TravelType;
  trip_type: TripType;
}