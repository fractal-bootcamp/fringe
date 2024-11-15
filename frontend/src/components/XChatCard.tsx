import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import ChatMessage from "./XChatMessage";
import ChatInput from "./XChatInput";
import { MessageRequest } from "@/types/types";

export interface MessageObject {
  id: string;
  sender: string;
  content: string;
}

interface XChatCardProps {
  senderId: string;
  matchId: string;
  title?: string;
  description?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  messageObjects: MessageObject[] | null;
  onSendMessage: (message: MessageRequest) => void;
}

const XChatCard = ({
  senderId,
  matchId,
  title = "Chat",
  description = "Online",
  avatarUrl = "",
  avatarFallback = "AI",
  messageObjects,
  onSendMessage,
}: XChatCardProps) => {
  const [messages, setMessages] = useState<MessageObject[] | null>(messageObjects);

  const handleSendMessage = (content: string) => {
    const newMessage: MessageObject = { id: new Date().toISOString(), sender: "user", content };
    const newMessageRequest: MessageRequest = {
      matchId: matchId,
      senderId: senderId,
      content: content,
    };
    onSendMessage(newMessageRequest);
    if (messages) {
      setMessages([...messages, newMessage]);
    }
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
        {messages && (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg.content} sender={msg.sender} />
            ))}
          </>
        )}
      </CardContent>

      <CardFooter className="p-0">
        <ChatInput onSendMessage={handleSendMessage} />
      </CardFooter>
    </Card>
  );
};

export default XChatCard;
