import { useEffect, useState } from "react";
import { getMessageHistory } from "@/api/apiMessages";
import { Message } from "@/types/types";
import { useAuthContext } from "@/contexts/AuthContext";

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

  return { messages, setMessages };
};

export default useMessages;
