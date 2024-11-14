"use client";

import useMatches from "@/hooks/useMatches";
import MatchPage from "@/components/MatchPage";

const Page = () => {
  // const { matches } = useMatches();
  //
  // console.log(matches);

  // // Split matches into two groups for demo purposes
  // // TODO: Remove this when we have real data
  // const yourTurnMatches = matches.slice(0, 3);
  // const theirTurnMatches = matches.slice(3, 6);

  // if (matches.length === 0) {
  //   return <div>No matches found</div>;
  // }

  return (
    <div>
      {/* <MatchPage matchesYourTurn={yourTurnMatches} matchesTheirTurn={theirTurnMatches} /> */}
    </div>
  );
};

export default Page;
