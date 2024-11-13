import { Match } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiGetMatches = async (token: string) => {
  const response = await axiosClient.get("/match", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const matches: Match[] = response.data;
  return matches;
};

export const apiGetMatchById = async (id: string, token: string) => {
  const response = await axiosClient.get(`/match/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const match: Match = response.data;
  return match;
};

export const apiAddMatch = async (userId1: string, userId2: string, token: string) => {
    const response = await axiosClient.post("/match/add", { userId1, userId2 }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const match: Match = response.data;
  return match;
};

export const apiDeleteMatch = async (id: string, token: string) => {
  const response = await axiosClient.post("/match/delete", { id }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
