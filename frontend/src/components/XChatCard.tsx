import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
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
  avatarUrl?: string;
  avatarFallback?: string;
  messageObjects: MessageObject[] | null;
  onSendMessage: (message: MessageRequest) => void;
}

const XChatCard = ({
  senderId,
  matchId,
  title = "Chat",
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
    <Card className="w-full max-w-sm mx-auto border-none shadow-none flex flex-col items-center">
      <CardHeader className="flex items-center justify-center border-y-[0.5px] border-black fixed top-10 z-30 w-full bg-white">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col py-32 space-y-4 overflow-y-scroll">
        {messages && (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg.content} sender={msg.sender} />
            ))}
          </>
        )}
      </CardContent>

      <CardFooter className="p-0 fixed bottom-20 z-40 w-[90%] bg-slate-200 border-none rounded-lg border-black">
        <ChatInput onSendMessage={handleSendMessage} />
      </CardFooter>
    </Card>
  );
};

export default XChatCard;
