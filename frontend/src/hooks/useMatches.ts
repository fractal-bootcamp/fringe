import { useEffect, useState } from "react";
import { Match, User } from "@/types/types";
import { apiGetUserById } from "@/api/apiUsers";

const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = async () => {
    const userId = "1"; // CHANGE THIS WHEN WE HAVE AUTH
    const currentUser: User = await apiGetUserById(userId);
    const matchesParsed: Match[] = currentUser.matches.map((match) => {
      const matchUser = match.users.find((user) => user.id !== userId);
      return { ...match, users: matchUser ? [matchUser] : [] };
    });
    setMatches(matchesParsed);
    console.log(matchesParsed);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches };
};

export default useMatches;
