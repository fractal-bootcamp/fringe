import { User } from "@/types/types";
import axiosClient from "./axiosClient";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

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
  const formData = new FormData();
  formData.append('photo', photo);
  
  const response = await axiosClient.post(`/user/update/${id}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const apiGetSignedUrl = async (id: string, photoId: string) => {
  const response = await axiosClient.get(`/user/${id}/photo/${photoId}`);
  return response.data.url;
};

export const createUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/user`, userData);
  return response.data;
};
