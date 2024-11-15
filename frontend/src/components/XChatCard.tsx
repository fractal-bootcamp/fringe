import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import ChatMessage from "./XChatMessage";
import ChatInput from "./XChatInput";
import { MessageRequest } from "@/types/types";
import XNavbar from "./XNavbar";
import { useRouter } from "next/navigation";

export interface MessageObject {
  id: string;
  sender: string;
  content: string;
}

interface XChatCardProps {
  senderId: string;
  matchId: string;
  userId: string;
  title?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  messageObjects: MessageObject[] | null;
  onSendMessage: (message: MessageRequest) => void;
  updateHeader: (newHeader: string) => void;
}

const XChatCard = ({
  senderId,
  matchId,
  userId,
  title = "Chat",
  avatarUrl = "",
  avatarFallback = "AI",
  messageObjects,
  onSendMessage,
  updateHeader,
}: XChatCardProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageObject[] | null>(messageObjects);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleNameClick = () => {
    updateHeader("Profile");
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto relative overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-40">
        <div className="flex flex-col items-center py-4 border-b max-w-2xl mx-auto">
          <Avatar className="h-12 w-12 mb-2">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="text-lg">{avatarFallback}</AvatarFallback>
          </Avatar>
          <h1 
            className="text-lg font-medium cursor-pointer hover:underline"
            onClick={handleNameClick}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Scrollable Message Area */}
      <div 
        className="flex-1 overflow-y-scroll px-4 pt-24 pb-32 no-scrollbar"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {messages && messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.content} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-[50px] left-0 right-0 bg-white border-t z-40">
        <div className="max-w-2xl mx-auto p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Fixed Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <XNavbar
          pathHome="/feed"
          pathLikes="/likes"
          pathMatches="/matches"
          pathSettings="/settings"
          updateHeader={updateHeader}
        />
      </div>
    </div>
  );
};

export default XChatCard;
