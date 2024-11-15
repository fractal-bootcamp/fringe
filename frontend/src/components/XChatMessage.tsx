import React from "react";

interface ChatMessageProps {
  message: string;
  sender: string;
}

const ChatMessage = ({ message, sender }: ChatMessageProps) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`rounded-3xl px-6 py-3 max-w-[80%] ${
          isUser 
            ? "bg-black text-white rounded-tr-sm" 
            : "bg-gray-100 text-black rounded-tl-sm"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
