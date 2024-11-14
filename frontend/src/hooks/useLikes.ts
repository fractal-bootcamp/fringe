import { apiAddLike, apiDeleteLike } from "@/api/apiLike";
import { apiGetUserById } from "@/api/apiUser";
import { Like, User } from "@/types/types";
import { useEffect } from "react";
import storeLike from "@/stores/storeLike";
import { useAuthContext } from "@/contexts/AuthContext";

const useLikes = () => {
  const { token } = useAuthContext();
  const { likes, loadLikes, deleteLike } = storeLike();

  // Get likes
  const fetchLikes = async () => {
    if (!token) return;
    const user: User = await apiGetUserById(token);
    const receivedLikes: Like[] = user.receivedLikes;
    loadLikes(receivedLikes);
  };

  // Delete like
  const handleDeleteLike = async (likeId: string) => {
    if (!token) return;
    await apiDeleteLike(likeId, token);
    deleteLike(likeId);
  };

  // Add like
  const handleAddLike = async (fromUserId: string, toUserId: string) => {
    if (!token) return;
    await apiAddLike(fromUserId, toUserId, token);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return { likes, handleDeleteLike, handleAddLike };
};

export default useLikes;
