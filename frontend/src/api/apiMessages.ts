import axiosClient from "./axiosClient";
import { MessageRequest } from "@/types/types";

export const sendMessage = async (message: MessageRequest, token: string) => {
  const response = await axiosClient.post("/chat/send", message, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getMessageHistory = async (matchId: string, token: string) => {
  const response = await axiosClient.get(`/chat/message-history/${matchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
