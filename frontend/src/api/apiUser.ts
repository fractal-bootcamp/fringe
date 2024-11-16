import { ProfileType, User } from "@/types/types";
import axiosClient from "./axiosClient";

// Get all users (all, applicant, company)
export const apiGetAllUsers = async (token: string) => {
  const response = await axiosClient.get("/user/getAllUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const users: User[] = response.data;
  return users;
};

export const apiGetAllApplicantUsers = async (token: string) => {
  const response = await axiosClient.post("/user/getAllApplicantUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const users: User[] = response.data;
  return users;
};

export const apiGetAllCompanyUsers = async (token: string) => {
  const response = await axiosClient.post("/user/getAllCompanyUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const users: User[] = response.data;
  return users;
};

// Get current user
export const apiGetUserById = async (token: string) => {
  const response = await axiosClient.get(`/user/getCurrentUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: User = response.data;
  return user;
};

// Get any user
export const apiGetUser = async (userId: string, token: string) => {
  const response = await axiosClient.post(
    `/user/getUser`,
    {
      userId: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user: User = response.data;
  return user;
};

export const apiUpdateUserProfile = async (name: string, location: string, token: string) => {
  const response = await axiosClient.post(
    `/user/updateProfile`,
    {
      name,
      location,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const apiUpdateUserPhoto = async (photo: File, token: string) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await axiosClient.post(`/user/updatePhoto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
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
  const response = await axiosClient.post(
    `/user/createUser`,
    {
      profileType: type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
