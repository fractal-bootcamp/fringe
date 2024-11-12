import { User } from "@/types/types";
import axiosClient from "./axiosClient";

export const getAllUsers = async () => {
  const response = await axiosClient.get("/user/");
  const users: User[] = response.data;
  return users;
};
