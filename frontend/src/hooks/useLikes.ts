import { apiDeleteLike } from "@/api/apiLikes";
import { apiGetUserById } from "@/api/apiUsers";
import { Like, User } from "@/types/types";
import { useEffect, useState } from "react";

const useLikes = () => {
  const [likes, setLikes] = useState<Like[]>([]);

  // Get likes
  const fetchLikes = async () => {
    const userId = "1"; // TODO: get user id from store
    const user: User = await apiGetUserById(userId);
    const receivedLikes: Like[] = user.receivedLikes;
    setLikes(receivedLikes);
  };

  // Delete like
  const deleteLike = async (id: string) => {
    await apiDeleteLike(id);
    setLikes(likes.filter((like) => like.id !== id));
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return { likes, deleteLike };
};

export default useLikes;
