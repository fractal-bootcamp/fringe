import { apiDeleteLike } from "@/api/apiLikes";
import { apiGetUserById } from "@/api/apiUsers";
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
    await deleteLike(id);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return { likes, handleDeleteLike };
};

export default useLikes;
