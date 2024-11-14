import axiosClient from "./axiosClient";

export const apiGetLikes = (userId: string, token: string) => {
  axiosClient.get(`/like/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiAddLike = (fromUserId: string, toUserId: string, token: string) => {
  axiosClient.post(`/like/add`, { fromUserId, toUserId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    });
};

export const apiDeleteLike = (likeId: string, token: string) => {
  axiosClient.post("/like/delete", { likeId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
