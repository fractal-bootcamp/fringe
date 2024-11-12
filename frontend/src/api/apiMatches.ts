import { Match} from "@/types/types";
import axiosClient from "./axiosClient";

export const apiGetMatches = async () => {
  const response = await axiosClient.get("/match");
  const matches: Match[] = response.data;
  return matches;
};

export const apiGetMatchById = async (id: string) => {
  const response = await axiosClient.get(`/match/${id}`);
  const match: Match = response.data;
  return match;
};

export const apiAddMatch = async (userId1: string, userId2: string) => {
  const response: Match = await axiosClient.post("/match/add", { userId1, userId2 });
  return response.data;
};

export const apiDeleteMatch = async (id: string) => {
  const response = await axiosClient.post("/match/delete", { id });
  return response.data;
};
