import React, { useState } from "react";
// import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t w-full rounded-lg border-none text-white">
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow min-h-[50px] max-h-[70px] outline-none rounded-lg bg-white border-none p-2 text-black"
      />
      <Button onClick={handleSend} className="p-3 bg-black text-white shrink-0">
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
