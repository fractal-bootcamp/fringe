import { User } from "@/types/types";
import LikesYouTab from "./LikesYouTab";

interface LikesYouPageProps {
  likesYouUsers: User[];
}

const LikesYouPage = ({ likesYouUsers }: LikesYouPageProps) => {
  return (
    <div>
      <div className="w-full text-center font-semibold">Likes You</div>
      <div className="grid grid-cols-2">
        {likesYouUsers.map((user, key) => (
          <LikesYouTab key={key} name={user.name} profilePhoto={user.profilePhotoIds[0]} />
        ))}
      </div>
    </div>
  );
};

export default LikesYouPage;
