"use client";

import XLikesYouCard from "@/components/XLikesYouCard";
import useLikes from "@/hooks/useLikes";
import useMatches from "@/hooks/useMatches";
import { Like, Match, User } from "@/types/types";
import { useRouter } from "next/navigation";

const Page = () => {
  const { likes } = useLikes();

  const router = useRouter();
  const { handleDeleteLike } = useLikes();
  const { handleAddMatch } = useMatches();

  if (!likes || likes.length === 0) {
    return <div>No likes yet</div>;
  }
  const likesParsed: { like: Like; likesYouUser: User }[] = likes.map((like: Like) => ({
    like,
    likesYouUser: like.fromUser,
  }));

  // Handler for adding matches + deleting likes when matching
  const handleOnMatch = async (userId1: string, userId2: string, likeId: string) => {
    const newMatch: Match | undefined = await handleAddMatch(userId1, userId2);
    handleDeleteLike(likeId);
    if (newMatch) {
      router.push(`/chat/${newMatch.id}`);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {likesParsed.map((like, key) => (
          <XLikesYouCard
            key={key}
            name={like.likesYouUser.name}
            image={like.likesYouUser.profilePhotoIds[0]}
            goToProfile={() => router.push(`/profile/${like.likesYouUser.id}`)}
            onMatch={() => handleOnMatch(like.likesYouUser.id, like.like.toUserId, like.like.id)}
            onUnmatch={() => handleDeleteLike(like.like.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
