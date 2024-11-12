import axiosClient from "./axiosClient";

export const getAllUsers = async () => {
  const response = await axiosClient.get("/user/");
  return response.data;
};
