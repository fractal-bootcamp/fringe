"use client";

import XMatchCard from "@/components/XMatchCard";
import useMatches from "@/hooks/useMatches";
import { useRouter } from "next/navigation";

const Page = () => {
  const { matches } = useMatches();
  const router = useRouter();

  if (matches.length === 0) {
    return <div>No matches found</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-2">
      {matches.map((match, key) => {
        const matchUser = match.users[0];
        return (
          <XMatchCard
            key={key}
            name={matchUser.name}
            initials={matchUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            message={match.messages[0].content}
            onChatClick={() => router.push(`/chat/${match.id}`)}
          />
        );
      })}
    </div>
  );
};

export default Page;
