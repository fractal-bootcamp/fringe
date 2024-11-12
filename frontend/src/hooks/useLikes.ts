import { apiAddLike, apiDeleteLike } from "@/api/apiLike";
import { apiGetUserById } from "@/api/apiUser";
import { Like, User } from "@/types/types";
import { useEffect } from "react";
import storeLike from "@/stores/storeLike";

const useLikes = () => {
  const { likes, loadLikes, deleteLike } = storeLike();

  // Get likes
  const fetchLikes = async () => {
    const userId = "1"; // TODO: get user id from store
    const user: User = await apiGetUserById(userId);
    const receivedLikes: Like[] = user.receivedLikes;
    loadLikes(receivedLikes);
  };

  // Delete like
  const handleDeleteLike = async (id: string) => {
    await apiDeleteLike(id);
    deleteLike(id);
  };

  // Add like
  const handleAddLike = async (fromUserId: string, toUserId: string) => {
    await apiAddLike(fromUserId, toUserId);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return { likes, handleDeleteLike, handleAddLike };
};

export default useLikes;
