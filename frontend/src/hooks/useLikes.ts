import { getUserById } from "@/api/apiUsers";
import { Like, User } from "@/types/types";
import { useEffect, useState } from "react";

const useLikes = () => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [likesUsers, setLikesUsers] = useState<User[]>([]);

  const fetchLikes = async () => {
    const userId = "1"; // TODO: get user id from store
    const user: User = await getUserById(userId);
    const receivedLikes: Like[] = user.receivedLikes;
    const likesFromUsers: User[] = Array.from(
      new Map(receivedLikes.map((like: Like) => [like.fromUser.id, like.fromUser])).values()
    ); // remove duplicates

    setLikes(receivedLikes);
    setLikesUsers(likesFromUsers);
    console.log(likesFromUsers);
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return { likes, likesUsers };
};

export default useLikes;
