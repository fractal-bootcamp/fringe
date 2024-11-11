"use client";

import { dummyApplicants } from "@/api/dummyApplicants";
import { dummyCompanies } from "@/api/dummyCompanies";
import { userTypeStore } from "@/stores/userTypeStore";
import MatchCard from "@/components/MatchCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const { userType } = userTypeStore();
  const [yourTurnExpanded, setYourTurnExpanded] = useState(true);
  const [theirTurnExpanded, setTheirTurnExpanded] = useState(true);
  
  // For demo purposes, split the matches between "your turn" and "their turn"
  const matchedProfiles = userType === "applicant" 
    ? dummyCompanies.slice(0, 6)
    : dummyApplicants.slice(0, 6);

  // Split matches into two groups
  const yourTurnMatches = matchedProfiles.slice(0, 3);
  const theirTurnMatches = matchedProfiles.slice(3, 6);

  // Simulate liked sections for each match
  const createMatchData = (profile: typeof matchedProfiles[0]) => ({
    profile,
    likedSections: [
      { section: "About", content: profile.prompts[0].answer },
      { section: "Location", content: profile.location },
      ...(userType === "applicant" ? [{
        section: "Industry",
        content: (profile as typeof dummyCompanies[0]).industry
      }] : [{
        section: "Experience",
        content: (profile as typeof dummyApplicants[0]).professionalExperiences[0]
      }])
    ]
  });

  return (
    <div className="p-4 mb-16">
      <h1 className="text-4xl font-bold mb-4">Matches</h1>
      
      {/* Your Turn Section */}
      <div className="mb-4">
        <button 
          className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2"
          onClick={() => setYourTurnExpanded(!yourTurnExpanded)}
        >
          <span className="font-semibold">Your Turn ({yourTurnMatches.length})</span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`transform transition-transform ${yourTurnExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        {yourTurnExpanded && (
          <div className="space-y-4">
            {yourTurnMatches.map(profile => (
              <MatchCard
                key={profile.id}
                {...createMatchData(profile)}
                isYourTurn={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Their Turn Section */}
      <div>
        <button 
          className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2"
          onClick={() => setTheirTurnExpanded(!theirTurnExpanded)}
        >
          <span className="font-semibold">Their Turn ({theirTurnMatches.length})</span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`transform transition-transform ${theirTurnExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        {theirTurnExpanded && (
          <div className="space-y-4">
            {theirTurnMatches.map(profile => (
              <MatchCard
                key={profile.id}
                {...createMatchData(profile)}
                isYourTurn={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
