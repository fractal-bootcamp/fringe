import axiosClient from "./axiosClient";

export const sendMessage = async (message: {senderId: string, matchId: string, content: string}) => {
  const response = await axiosClient.post("/chat/message", message);
  return response.data;
};

export const getMessageHistory = async (matchId: string) => {
  const response = await axiosClient.get(`/chat/message-history/${matchId}`);
  return response.data;
};



