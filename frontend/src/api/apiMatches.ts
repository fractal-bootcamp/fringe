import { Match } from "../../../shared/schema";
import axiosClient from "./axiosClient";

export const getMatches = async () => {
  const response = await axiosClient.get("/match/matches");
  const matches: Match[] = response.data;
  return matches;
};

export const getMatchById = async (id: string) => {
  const response = await axiosClient.get(`/match/matches/${id}`);
  const match: Match = response.data;
  return match;
};
