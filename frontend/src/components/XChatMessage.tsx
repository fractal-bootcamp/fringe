import React from "react";
import { CardContent } from "./ui/card";

interface ChatMessageProps {
  message: string;
  sender: "user" | "recipient";
}

const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-3`}>
      <CardContent
        className={`max-w-xs p-2 rounded-lg ${
          isUser ? "bg-black text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {message}
      </CardContent>
    </div>
  );
};

export default ChatMessage;
