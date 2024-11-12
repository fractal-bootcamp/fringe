import useMatches from "@/hooks/useMatches";
import { useRouter } from "next/navigation";

interface MatchCardProps {
  matchId: string;
  profile: {
    id: string;
    name: string;
    location: string;
  };
  isYourTurn: boolean;
}

const MatchCard = ({ matchId, profile, isYourTurn }: MatchCardProps) => {
  const router = useRouter();
  const { handleDeleteMatch } = useMatches();

  return (
    <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center space-x-4">
        <button
          className="flex items-center justify-center space-x-4"
          onClick={() => router.push(`/chat/${matchId}`)}
        >
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-600">{profile.name[0]}</span>
          </div>

          <div className="flex-1 text-center">
            <div className="flex justify-center items-start">
              <h3 className="font-semibold text-lg">{profile.name}</h3>
            </div>
            <p className="text-gray-600 text-sm">{profile.location}</p>
          </div>
        </button>

        <button
          onClick={() => handleDeleteMatch(matchId)}
          className="mt-2 bg-red-500 text-white rounded px-4 py-2 text-xs self-center"
        >
          Unmatch
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
