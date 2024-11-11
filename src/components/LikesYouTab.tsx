import { useRouter } from "next/navigation";

interface LikesYouTabProps {
  name: string;
  profilePhoto: string;
}

const LikesYouTab = ({ name }: LikesYouTabProps) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/feed")} className="rounded-xl bg-white m-1 p-2">
      <p className="italic text-xs text-left">Liked your photo</p>
      <p className="font-semibold text-left">{name}</p>
      {/* <img src="" alt="" /> */}
    </button>
  );
};

export default LikesYouTab;
