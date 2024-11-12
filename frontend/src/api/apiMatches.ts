import { Match } from "@/types/types";
import axiosClient from "./axiosClient";

export const getMatches = async () => {
  const response = await axiosClient.get("/match");
  const matches: Match[] = response.data;
  return matches;
};
