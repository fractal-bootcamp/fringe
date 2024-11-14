import { Like, User } from "@/types/types";
import XLikesYouCard from "./XLikesYouCard";
import { useRouter } from "next/navigation";
import useLikes from "@/hooks/useLikes";
import useMatches from "@/hooks/useMatches";

interface LikesYouPageProps {
  likes: Like[];
}

const LikesYouPage = ({ likes }: LikesYouPageProps) => {
  const router = useRouter();
  const { handleDeleteLike } = useLikes();
  const { handleAddMatch } = useMatches();

  if (!likes || likes.length === 0) {
    return <div>No likes yet</div>;
  }
  const likesYouUsers: { like: Like; likesYouUser: User }[] = likes.map((like: Like) => ({
    like,
    likesYouUser: like.fromUser,
  }));

  return (
    <div>
      <div className="w-full text-center font-semibold">Likes You</div>
      <div className="grid grid-cols-2 gap-4">
        {likesYouUsers.map((user, key) => (
          <XLikesYouCard
            key={key}
            name={user.likesYouUser.name}
            image={user.likesYouUser.profilePhotoIds[0]}
            goToProfile={() => router.push(`/profile/${user.likesYouUser.id}`)}
            onMatch={() => handleAddMatch(user.likesYouUser.id, user.like.toUserId)}
            onUnmatch={() => handleDeleteLike(user.like.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LikesYouPage;
