"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Message } from "@/lib/types";
import { useState } from "react";

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hey, I am Journee, your very own journey planner! Where does your heart want to go today?",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];

    setMessages(newMessages);
    //TODO: call api to analyze and extract trip details
    setInput("");
  };

  return (
    <Card className="max-w-lg mx-auto h-[600px] flex flex-col">
      <CardContent className="flex-1 overflow-y-auto space-y-2 p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-primary text-white"
                : "mr-auto bg-muted"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </CardContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2 p-4 border-t"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: plan a five day trip to Paris."
        />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}
