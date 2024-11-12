import { apiGetMatchById } from "@/api/apiMatches";
import { Match } from "@/types/types";
import { useEffect, useState } from "react";

const useMatch = (matchId: string) => {
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const match = await apiGetMatchById(matchId);
      setMatch(match);
    };

    fetchMatch();

    const intervalId = setInterval(fetchMatch, 1000);

    return () => clearInterval(intervalId);
  }, [matchId]);

  return { match };
};

export default useMatch;