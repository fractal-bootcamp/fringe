import axiosClient from "./axiosClient";
import { MessageRequest } from "@/types/types";

export const sendMessage = async (message: MessageRequest) => {
  const response = await axiosClient.post("/chat/send", message);
  return response.data;
};

export const getMessageHistory = async (matchId: string) => {
  const response = await axiosClient.get(`/chat/message-history/${matchId}`);
  return response.data;
};



