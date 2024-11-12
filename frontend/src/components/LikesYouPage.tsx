import { Like, User } from "@/types/types";
import LikesYouTab from "./LikesYouTab";
import useLikes from "@/hooks/useLikes";

interface LikesYouPageProps {
  likes: Like[];
}

const LikesYouPage = ({ likes }: LikesYouPageProps) => {
  const likesYouUsers: { like: Like; likesYouUser: User }[] = likes.map((like: Like) => ({
    like,
    likesYouUser: like.fromUser,
  }));

  return (
    <div>
      <div className="w-full text-center font-semibold">Likes You</div>
      <div className="grid grid-cols-2">
        {likesYouUsers.map((user, key) => (
          <LikesYouTab key={key} like={user.like} user={user.likesYouUser} />
        ))}
      </div>
    </div>
  );
};

export default LikesYouPage;
