"use client";

import MatchCard from "@/components/MatchCard";
import { Match } from "@/types/types";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface MatchPageProps {
  matchesYourTurn: Match[];
  matchesTheirTurn: Match[];
}

const MatchPage = ({ matchesYourTurn, matchesTheirTurn }: MatchPageProps) => {
  const [yourTurnExpanded, setYourTurnExpanded] = useState(true);
  const [theirTurnExpanded, setTheirTurnExpanded] = useState(true);
  return (
    <div className="p-4 mb-16">
      <h1 className="text-4xl font-bold mb-4">Matches</h1>

      {/* Your Turn Section */}
      <div className="mb-4">
        <button
          className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2"
          onClick={() => setYourTurnExpanded(!yourTurnExpanded)}
        >
          <span className="font-semibold">Your Turn ({matchesYourTurn.length})</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transform transition-transform ${yourTurnExpanded ? "rotate-180" : ""}`}
          />
        </button>
        {yourTurnExpanded && (
          <div className="space-y-4">
            {matchesYourTurn.map((match) => (
              <MatchCard key={match.id} profile={match.users[0]} isYourTurn={true} />
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
          <span className="font-semibold">Their Turn ({matchesTheirTurn.length})</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transform transition-transform ${theirTurnExpanded ? "rotate-180" : ""}`}
          />
        </button>
        {theirTurnExpanded && (
          <div className="space-y-4">
            {matchesTheirTurn.map((match) => (
              <MatchCard key={match.id} profile={match.users[0]} isYourTurn={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPage;
