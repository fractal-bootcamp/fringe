import { apiDeleteLike } from "@/api/apiLikes";
import { apiGetUserById } from "@/api/apiUsers";
import storeLike from "@/stores/storeLike";
import { Like, User } from "@/types/types";
import { useEffect, useState, useCallback } from "react";

const useLikes = () => {
  // const [likes, setLikes] = useState<Like[]>([]);

  const { likes, loadLikes, deleteLike } = storeLike();

  console.log(likes);

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
  }, []); // Keep only one useEffect for initial load

  return { likes, handleDeleteLike };
};

export default useLikes;
