import useLikes from "@/hooks/useLikes";
import { Like, User } from "@/types/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface LikesYouTabProps {
  like: Like;
  user: User;
}

const LikesYouTab = ({ like, user }: LikesYouTabProps) => {
  const router = useRouter();
  const { deleteLike } = useLikes();
  const handleUnmatch = async () => {
    await deleteLike(like.id);
  };

  return (
    <div className="rounded-xl bg-white m-1 p-2">
      <button onClick={() => router.push("/feed")}>
        <p className="italic text-xs text-left">Liked your photo</p>
        <p className="font-semibold text-left">{user.name}</p>
      </button>
      <button onClick={handleUnmatch} className="flex items-center gap-2">
        <FontAwesomeIcon icon={faXmark} />
        <p className="text-xs">Unmatch</p>
      </button>
    </div>
  );
};

export default LikesYouTab;
