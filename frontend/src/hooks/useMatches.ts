import { useState } from "react";
import { Match } from "@/types/types";
import { getMatches } from "@/api/apiMatches";

const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = async () => {
    const res = await getMatches();
    setMatches(res);
  };

  return { matches };
};

export default useMatches;
