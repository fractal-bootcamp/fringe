"use client";

import { useParams } from "next/navigation";
import ChatPage from "@/components/ChatPage";
import useMatch from "@/hooks/useMatch";

// interface ChatMessage {
//   content: string;
//   sender: "user" | "match" | "system";
//   timestamp: Date;
// }

const Page = () => {
  const { slug } = useParams();
  const { match } = useMatch(slug as string);

  if (!match) return <div>Loading...</div>;
  return (
    <div>
      <ChatPage match={match} />
    </div>
  );
};

export default Page;
