import { apiGetMatchById } from "@/api/apiMatch";
import { Match } from "@/types/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const useMatch = (matchId: string) => {
  const { token } = useAuthContext();
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      if (!token) return;
      const match = await apiGetMatchById(matchId, token);
      setMatch(match);
    };

    fetchMatch();
  }, [matchId]);

  return { match };
};

export default useMatch;
