import { useEffect, useState } from "react";
import { getMessageHistory } from "@/api/apiMessages";
import { Message, MessageRequest } from "@/types/types";
import { useAuthContext } from "@/contexts/AuthContext";
import { sendMessage } from "@/api/apiMessages";

const useMessages = (matchId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) return;
      const messages = await getMessageHistory(matchId, token);
      setMessages(messages);
    };
    fetchMessages();
  }, [matchId]);

  const handleSendMessage = async (message: MessageRequest) => {
    if (token) {
      await sendMessage(message, token);
    }
  };

  return { messages, setMessages, handleSendMessage };
};

export default useMessages;
