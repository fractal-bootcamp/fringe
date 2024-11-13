import { User } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiGetAllUsers = async (token: string) => {
  const response = await axiosClient.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const users: User[] = response.data;
  return users;
};

export const apiGetUserById = async (id: string, token: string) => {
  const response = await axiosClient.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: User = response.data;
  return user;
};

export const apiUpdateUserProfile = async (
  id: string,
  name: string,
  location: string,
  token: string,
  // profilePhotoIds: string[],
  // profileType: ProfileType
) => {
  const response = await axiosClient.post(`/user/update/${id}`, {
    name,
    location,

    // profilePhotoIds,
    // profileType,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const apiUpdateUserPhoto = async (id: string, photo: File, token: string) => {
  const formData = new FormData();
  formData.append('photo', photo);
  
  const response = await axiosClient.post(`/user/update/${id}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const apiGetSignedUrl = async (id: string, photoId: string, token: string) => {
  const response = await axiosClient.get(`/user/${id}/photo/${photoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 
  return response.data.url;
};
