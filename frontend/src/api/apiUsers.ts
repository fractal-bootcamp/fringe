import { User } from "../../../shared/schema";
import axiosClient from "./axiosClient";

export const getAllUsers = async () => {
  const response = await axiosClient.get("/user");
  const users: User[] = response.data;
  return users;
};

export const getUserById = async (id: string) => {
  const response = await axiosClient.get(`/user/${id}`);
  const user: User = response.data;
  return user;
};
