import { Applicant, Company } from "@/types/types";
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

  return (
    <div
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/chat/${matchId}`)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl text-gray-600">{profile.name[0]}</span>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isYourTurn ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {isYourTurn ? "Your turn" : "Their turn"}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{profile.location}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
