import { useEffect } from "react";
import { Match, User } from "@/types/types";
import { apiGetUserById } from "@/api/apiUsers";
import storeMatch from "@/stores/storeMatch";
import { apiAddMatch, apiDeleteMatch } from "@/api/apiMatches";

const useMatches = () => {
  const { matches, loadMatches, addMatch, deleteMatch } = storeMatch();

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

  // Add match
  const handleAddMatch = async (userId1: string, userId2: string) => {
    const match: Match = await apiAddMatch(userId1, userId2);
    addMatch(match);
  };

  // Delete match
  const handleDeleteMatch = async (matchId: string) => {
    await apiDeleteMatch(matchId);
    deleteMatch(matchId);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches, handleAddMatch, handleDeleteMatch };
};

export default useMatches;
