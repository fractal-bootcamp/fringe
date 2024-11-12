import React, { useState, useEffect } from "react";
import { Match, MessageRequest } from "@/types/types";
import { useParams } from "next/navigation";
import { sendMessage, getMessageHistory } from "../api/apiChat";
import useUser from "@/hooks/useUser";

const ChatPage = ({ matchId }: { matchId: string }) => {
  const userId = "123";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageRequest[]>([]);

  useEffect(() => {
    const pollMessages = async () => {
      const history = await getMessageHistory(matchId);
      setMessages(history);
    };

  // Poll every 3 seconds
  const interval = setInterval(pollMessages, 3000);

  pollMessages();

  return () => clearInterval(interval);
  }, [matchId]);

  async function handleSend(): Promise<void> {
    if (!message.trim()) return;
    
    const newMessage: MessageRequest = {
      content: message,
      matchId: matchId,
      senderId: userId,
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage(""); 

    await sendMessage({
      content: message,
      matchId: matchId, 
      senderId: userId,
    });
  }


  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg text-gray-600">Test</span>
          </div>
          <h1 className="font-semibold">Test</h1>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {/* Match announcement */}
        <div className="text-center text-sm text-gray-500 mb-6">
          You matched with Test!
        </div>

        {/* User messages */}
        <div className="space-y-4 mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
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
