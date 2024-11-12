import { Match } from "@/types/types";
import { create } from "zustand";

interface MatchState {
  matches: Match[];
  loadMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  deleteMatch: (matchId: string) => void;
}

const storeMatch = create<MatchState>((set) => ({
  matches: [],
  loadMatches: (matches: Match[]) => set(() => ({ matches })),
  addMatch: (match: Match) => set((state) => ({ matches: [...state.matches, match] })),
  deleteMatch: (matchId: string) =>
    set((state) => ({ matches: state.matches.filter((match) => match.id !== matchId) })),
}));

export default { storeMatch };
