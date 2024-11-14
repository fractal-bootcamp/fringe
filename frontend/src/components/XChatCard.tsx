import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import ChatMessage from "./XChatMessage";
import ChatInput from "./XChatInput";

interface Message {
  id: number;
  sender: "user" | "recipient";
  content: string;
}

interface ChatCardProps {
  title?: string;
  description?: string;
  avatarUrl?: string;
  avatarFallback?: string;
}

const ChatCard = ({ 
  title = "Chat",
  description = "Online",
  avatarUrl = "",
  avatarFallback = "AI"
}: ChatCardProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = { id: messages.length + 1, sender: "user", content };
    setMessages([...messages, newMessage]);
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="flex items-center p-4 space-x-4 border-b">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.content} sender={msg.sender} />
        ))}
      </CardContent>

      <CardFooter className="p-0">
        <ChatInput onSendMessage={handleSendMessage} />
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
