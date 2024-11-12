import { apiGetMatchById } from "@/api/apiMatches";
import { Message } from "@/types/types";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

const useMatch = (matchId: string) => {
  const [match, setMatch] = useState<{id: string, users: User[], messages: Message[]}>();

  useEffect(() => {
    const fetchMatch = async () => {
      const match = await apiGetMatchById(matchId);
      setMatch(match);
    };
    fetchMatch();
  }, []);

  return { ...match, id: matchId };
};

export default useMatch;
