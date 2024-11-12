import axiosClient from "./axiosClient";

export const apiGetLikes = (userId: string) => {
  axiosClient.get(`/like/${userId}`);
};

export const apiDeleteLike = (id: string) => {
  console.log("apiDeleteLike", id);
  axiosClient.post(`/like/delete`, { id: id });
};
