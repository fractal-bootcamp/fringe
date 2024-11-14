import { useEffect } from "react";
import { Match, User } from "@/types/types";
import { apiGetUserById } from "@/api/apiUser";
import storeMatch from "@/stores/storeMatch";
import { apiAddMatch, apiDeleteMatch } from "@/api/apiMatch";
import { useAuthContext } from "@/contexts/AuthContext";
const useMatches = () => {
  const { matches, loadMatches, addMatch, deleteMatch } = storeMatch();
  const { token } = useAuthContext();

  // Get matches
  const fetchMatches = async () => {
    if (!token) return;
    const user: User = await apiGetUserById(token);
    if (!user || !user.matches || user.matches.length === 0) {
      return;
    }
    const matchesParsed: Match[] = user.matches.map((match) => {
      const matchUser = match.users.find((user) => user.id !== user.id);
      return { ...match, users: matchUser ? [matchUser] : [] };
    });
  
    loadMatches(matchesParsed);
  };

  // Add match
  const handleAddMatch = async (userId1: string, userId2: string) => {
    if (!token) return;
    const match: Match = await apiAddMatch(userId1, userId2, token);
    addMatch(match);
  };

  // Delete match
  const handleDeleteMatch = async (matchId: string) => {
    if (!token) return;
    await apiDeleteMatch(matchId, token);
    deleteMatch(matchId);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches, handleAddMatch, handleDeleteMatch };
};

export default useMatches;
