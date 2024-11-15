import React, { useState } from "react";
import { Message } from "@/types/types";
import { sendMessage } from "../api/apiMessages";
import useMessages from "@/hooks/useMessages";
import { useAuthContext } from "@/contexts/AuthContext";

import { Match } from "@/types/types";
import useUser from "@/hooks/useUser";

interface ChatPageProps {
  match: Match;
}

const ChatPage = ({ match }: ChatPageProps) => {
  const [message, setMessage] = useState("");
  const { messages, setMessages } = useMessages(match.id);
  const { token } = useAuthContext();
  const { user } = useUser();

  async function handleSend(): Promise<void> {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: "",
      content: message.trim(),
      matchId: match.id,
      senderId: user?.id || "",
      createdAt: new Date(),
      match: match,
      sender: match.users[0],
    };

    setMessages((prev: Message[]) => [...prev, newMessage]);
    setMessage("");
    if (!token) return;
    await sendMessage(
      {
        content: message,
        matchId: match.id,
        senderId: user?.id || "",
      },
      token
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg text-gray-600">{match.users[1].name.charAt(0)}</span>
          </div>
          <h1 className="font-semibold">{match.users[1].name}</h1>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {/* Match announcement */}
        <div className="text-center text-sm text-gray-500 mb-6">
          You matched with {match.users[1].name}!
        </div>

        {/* User messages */}
        <div className="space-y-4 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === "1" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.senderId === "1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat input */}
      <div className="fixed bottom-[56px] left-0 right-0 border-t bg-white">
        <div className="p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2"
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
