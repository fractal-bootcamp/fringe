// import { ProfileType } from "@/types/types";
import { User } from "../../../shared/schema";
import axiosClient from "./axiosClient";

export const apiGetAllUsers = async () => {
  const response = await axiosClient.get("/user");
  const users: User[] = response.data;
  return users;
};

export const apiGetUserById = async (id: string) => {
  const response = await axiosClient.get(`/user/${id}`);
  const user: User = response.data;
  return user;
};

export const apiUpdateUserProfile = async (
  id: string,
  name: string,
  location: string
  // profilePhotoIds: string[],
  // profileType: ProfileType
) => {
  const response = await axiosClient.post(`/user/update/${id}`, {
    name,
    location,
    // profilePhotoIds,
    // profileType,
  });
  return response.data;
};

export const apiUpdateUserPhoto = async (id: string, photo: File) => {
  // const response = await axiosClient.post(`/user/update/${id}/photo`, { photo });
  // return response.data;
  console.log(photo);
};
