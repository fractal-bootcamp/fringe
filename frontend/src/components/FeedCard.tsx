import { Applicant, Company, Prompt, User } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faHeart,
  faLocationDot,
  faCalendarDays,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

interface FeedCardProps {
  user: User;
  type: "client" | "company";
  onReject: () => void;
  onLikeSection: (section: string, content: string) => void;
}

export default function FeedCard({ user, type, onReject, onLikeSection }: FeedCardProps) {
  const LikeButton = ({ section, content }: { section: string; content: string }) => (
    <button
      onClick={() => onLikeSection(section, content)}
      className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-white shadow-md 
        flex items-center justify-center hover:bg-gray-50 transition-colors"
    >
      <FontAwesomeIcon icon={faHeart} className="text-rose-400 text-xl" />
    </button>
  );

  if (type === "client") {
    const applicantProfile = user.applicantProfile;
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 pt-6 mb-6 bg-white rounded-xl">
          <h2 className="text-4xl font-bold">{user.name}</h2>
        </div>

        {/* Photo Section */}
        <div className="mb-6 bg-white rounded-xl relative">
          <div className="w-full aspect-[4/3]">
            {user.profilePhotoIds?.[0] && (
              <div className="w-full h-full">{/* Add Image component here */}</div>
            )}
            <LikeButton section="photo" content="profile photo" />
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="px-6 mb-6">
          <div className="divide-y border-y">
            <div className="py-4 flex items-center gap-4">
              <span className="text-xl text-gray-600">
                <FontAwesomeIcon icon={faBriefcase} />
              </span>
              <span>{applicantProfile.professionalExperiences?.[0]}</span>
            </div>
            <div className="py-4 flex items-center gap-4">
              <span className="text-xl text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <span>{user.location}</span>
            </div>
            <div className="py-4 flex items-center gap-4">
              <span className="text-xl text-gray-600">
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
              <span>{applicantProfile.yearsOfExperience} years experience</span>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="px-6 space-y-6 mb-20">
          {applicant.prompts &&
            applicant.prompts.map((prompt, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md relative">
                <p className="font-semibold text-gray-900 mb-2">{prompt.question}</p>
                <p className="text-gray-700">{prompt.answer}</p>
                <LikeButton section={`prompt_${index}`} content={prompt.answer} />
              </div>
            ))}
        </div>

        {/* Reject Button */}
        <div className="fixed bottom-16 left-8">
          <button
            onClick={onReject}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center 
              border-2 border-black text-black hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faX} className="text-2xl" />
          </button>
        </div>
      </div>
    );
  }

  // Company version
  const company = item;
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="px-6 pt-6 mb-6 bg-white rounded-xl">
        <h2 className="text-4xl font-bold">{company.name}</h2>
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <span>{company.location}</span>
          <span>•</span>
          <span className="capitalize">{company.industry}</span>
        </div>
      </div>

      {/* Photo Section */}
      <div className="mb-6 bg-white rounded-xl relative">
        <div className="w-full aspect-[4/3]">
          {company.profilePhotoIds?.[0] && (
            <div className="w-full h-full">{/* Add Image component here */}</div>
          )}
          <LikeButton section="photo" content="company photo" />
        </div>
      </div>

      {/* Company Stats Section */}
      <div className="px-6 space-y-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-md relative">
          <p>
            <span className="font-semibold">Team Size:</span> {company.employeeCount} employees
          </p>
          <p>
            <span className="font-semibold">Operating for:</span> {company.yearsOfOperation} years
          </p>
          <p>
            <span className="font-semibold">Funding:</span> {company.fundingRound}
          </p>
          <LikeButton section="company_stats" content="company statistics" />
        </div>
      </div>

      {/* Prompts Section */}
      <div className="px-6 space-y-6 mb-20">
        {company.prompts &&
          company.prompts.map((prompt, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md relative">
              <p className="font-semibold text-gray-900 mb-2">{prompt.question}</p>
              <p className="text-gray-700">{prompt.answer}</p>
              <LikeButton section={`prompt_${index}`} content={prompt.answer} />
            </div>
          ))}
      </div>

      {/* Reject Button */}
      <div className="fixed bottom-16 left-8">
        <button
          onClick={onReject}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center 
            border-2 border-black text-black hover:bg-gray-50 transition-colors"
        >
          <FontAwesomeIcon icon={faX} className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
