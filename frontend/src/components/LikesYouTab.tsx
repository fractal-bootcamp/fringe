import useLikes from "@/hooks/useLikes";
import useMatches from "@/hooks/useMatches";
import useUser from "@/hooks/useUser";
import { Like, User } from "@/types/types";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface LikesYouTabProps {
  like: Like;
  user: User;
}

const LikesYouTab = ({ like, user }: LikesYouTabProps) => {
  const router = useRouter();
  const { handleDeleteLike } = useLikes();
  const { handleAddMatch } = useMatches();
  const { user: currentUser } = useUser();

  if (!currentUser) return null;

  const addMatch = async () => {
    await handleAddMatch(user.id, currentUser.id);
    await handleDeleteLike(like.id);
  };

  return (
    <div className="rounded-xl bg-white m-1 p-2">
      <button onClick={() => router.push("/feed")}>
        <p className="italic text-xs text-left">Liked your photo</p>
        <p className="font-semibold text-left">{user.name}</p>
      </button>
      <div className="flex gap-2">
        <button onClick={addMatch} className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHeart} />
          <p className="text-xs">Match</p>
        </button>
        <button onClick={() => handleDeleteLike(like.id)} className="flex items-center gap-2">
          <FontAwesomeIcon icon={faXmark} />
          <p className="text-xs">Unmatch</p>
        </button>
      </div>
    </div>
  );
};

export default LikesYouTab;
