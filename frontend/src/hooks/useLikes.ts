import { getUserById } from "@/api/apiUsers";
import { Like, User } from "@/types/types";
import { useEffect, useState } from "react";

const useLikes = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [likesUsers, setLikesUsers] = useState<User[]>([]);

  const fetchLikes = async () => {
    const userId = "1";
    const user: User = await getUserById(userId);
    const receivedLikes: Like[] = user.receivedLikes;
    const likesFromUsers: User[] = receivedLikes.map((like: Like) => like.fromUser);
    setLikes(receivedLikes);
    setLikesUsers(likesFromUsers);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return { likes, likesUsers };
};

export default useLikes;
