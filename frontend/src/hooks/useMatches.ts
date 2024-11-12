import { useEffect } from "react";
import { Match, User } from "@/types/types";
import { apiGetUserById } from "@/api/apiUsers";
import storeMatch from "@/stores/storeMatch";
import { apiDeleteMatch } from "@/api/apiMatches";

const useMatches = () => {
  const { matches, loadMatches, deleteMatch } = storeMatch();

  // Get matches
  const fetchMatches = async () => {
    const userId = "1"; // CHANGE THIS WHEN WE HAVE AUTH
    const user: User = await apiGetUserById(userId);
    const matchesParsed: Match[] = user.matches.map((match) => {
      const matchUser = match.users.find((user) => user.id !== userId);
      return { ...match, users: matchUser ? [matchUser] : [] };
    });
    loadMatches(matchesParsed);
  };

  // Delete match
  const handleDeleteMatch = async (matchId: string) => {
    await apiDeleteMatch(matchId);
    await deleteMatch(matchId);
    console.log(`Match deleted: ${matchId}`);
    console.log(matches);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches, handleDeleteMatch };
};

export default useMatches;
