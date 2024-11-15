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
    <div className="flex flex-col gap-4">
      {matches.map((match, key) => {
        const matchUser = match.users[0];
        const message =
          match.messages.length > 1 ? match.messages[match.messages.length - 1].content : "";
        return (
          <XMatchCard
            key={key}
            name={matchUser.name}
            initials={matchUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            message={message}
            onChatClick={() => router.push(`/chat/${match.id}`)}
          />
        );
      })}
    </div>
  );
};

export default Page;
