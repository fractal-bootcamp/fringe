import { useEffect, useState } from "react";
import { getMessageHistory } from "@/api/apiMessages";
import { Message } from "@/types/types";

const useMessages = (matchId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessageHistory(matchId);
      setMessages(messages);
    };
    fetchMessages();
  }, [matchId]);

  return { messages, setMessages };
};

export default useMessages;
