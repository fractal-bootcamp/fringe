import { apiGetMatchById } from "@/api/apiMatch";
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
  }, []);

  return { match };
};

export default useMatch;
