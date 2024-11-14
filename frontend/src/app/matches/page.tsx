"use client";

import XMatchCard from "@/components/XMatchCard";
import useMatches from "@/hooks/useMatches";

const Page = () => {
  const { matches } = useMatches();

  if (matches.length === 0) {
    return <div>No matches found</div>;
  }

  return (
    <div>
      {matches.map((match) => {
        const matchUser = match.users[0];
        return (
          <XMatchCard name={matchUser.name} initials="0" message={match.messages[0].content} />
        );
      })}
    </div>
  );
};

export default Page;
