import axiosClient from "./axiosClient";

export const apiDeleteLike = (id: string) => axiosClient.post(`/like/delete`, { data: { id } });
