import { ProfileType, User } from "@/types/types";
import axiosClient from "./axiosClient";

export const apiGetAllUsers = async (token: string) => {
  const response = await axiosClient.get("/user/getAllUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const users: User[] = response.data;
  return users;
};

export const apiGetUserById = async (token: string) => {
  const response = await axiosClient.get(`/user/getCurrentUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: User = response.data;
  console.log('User data:', user);
  return user;
};

export const apiUpdateUserProfile = async (
  name: string,
  location: string,
  token: string,
  // profilePhotoIds: string[],
  // profileType: ProfileType
) => {
  const response = await axiosClient.post(`/user/updateProfile`, {
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

export const apiUpdateUserPhoto = async (photo: File, token: string) => {
  const formData = new FormData();
  formData.append('photo', photo);
  
  const response = await axiosClient.post(`/user/updatePhoto`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const apiGetSignedUrl = async (photoId: string, token: string) => {
  const response = await axiosClient.get(`/user/photos/${photoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 
  return response.data.url;
};

export const apiCreateUser = async (type: ProfileType, token: string) => {
  const response = await axiosClient.post(`/user/createUser`, {
    profileType: type,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};