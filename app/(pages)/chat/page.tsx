"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatPage() {
  const [userInitialPrompt, setUserInitialPrompt] = useState<string>("");

  const handleSendMessage = () => {
    //TODO
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-6">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-white text-xl md:text-3xl font-bold mb-1">
            Hi, I'm Journee AI
          </h1>
          <p className="text-sm md:text-md">
            I can help you plan your next trip. Where would you like to go?
          </p>
        </div>

        <div className="relative flex items-center gap-2 w-full max-w-xl mx-auto">
          <div className="flex-1 relative">
            <Input
              value={userInitialPrompt}
              onChange={(e) => setUserInitialPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Try: Plan a 5 day trip to Paris under $2000"
              className="text-white placeholder:text-accent rounded-sm px-6 py-2 text-sm md:text-md h-12 pr-20"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!userInitialPrompt.trim()}
            className="absolute right-1 bg-primary text-white rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
