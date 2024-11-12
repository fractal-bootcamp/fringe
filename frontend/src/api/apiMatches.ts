import { Match } from "../../../shared/schema";
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

export const apiDeleteMatch = async (id: string) => {
  await axiosClient.delete(`/match/${id}`);
};
