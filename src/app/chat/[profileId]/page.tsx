"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { dummyApplicants } from "@/api/dummyApplicants";
import { dummyCompanies } from "@/api/dummyCompanies";
import { userTypeStore } from "@/stores/userTypeStore";

interface ChatMessage {
  content: string;
  sender: 'user' | 'match';
  timestamp: Date;
}

const ChatPage = () => {
  const { profileId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { userType } = userTypeStore();
  
  const matchedProfile = userType === "applicant"
    ? dummyCompanies.find(c => c.id === profileId)
    : dummyApplicants.find(a => a.id === profileId);

  const likedSections = matchedProfile ? [
    { section: "About", content: matchedProfile.prompts[0].answer },
    { section: "Location", content: matchedProfile.location },
    ...(userType === "applicant" ? [{
      section: "Industry",
      content: (matchedProfile as typeof dummyCompanies[0]).industry
    }] : [{
      section: "Experience",
      content: (matchedProfile as typeof dummyApplicants[0]).professionalExperiences[0]
    }])
  ] : [];

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add new message to messages array
    setMessages([
      ...messages,
      {
        content: message,
        sender: 'user',
        timestamp: new Date()
      }
    ]);
    
    setMessage("");
  };

  if (!matchedProfile) {
    return <div className="p-4">Profile not found</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-lg text-gray-600">{matchedProfile.name[0]}</span>
        </div>
        <h1 className="font-semibold">{matchedProfile.name}</h1>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {/* Match announcement */}
        <div className="text-center text-sm text-gray-500 mb-6">
          You matched with {matchedProfile.name}!
        </div>

        {/* Liked sections as messages */}
        <div className="space-y-4">
          {likedSections.map((like, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="bg-pink-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-xs text-pink-800 font-medium mb-1">
                  Liked your {like.section.toLowerCase()}
                </p>
                <p className="text-sm text-gray-800">
                  {like.content}
                </p>
              </div>
              {index === likedSections.length - 1 && (
                <div className="mt-4 text-sm text-gray-500 italic px-2">
                  Start a conversation about what they liked!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User messages */}
        <div className="space-y-4 mt-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg p-3 max-w-[80%] ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <p className="text-sm">{msg.content}</p>
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
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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