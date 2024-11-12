"use client";

import { useParams } from "next/navigation";
import ChatPage from "@/components/ChatPage";
import useMatch from "@/hooks/useMatch";

// interface ChatMessage {
//   content: string;
//   sender: "user" | "match" | "system";
//   timestamp: Date;
// }

const Page = ({ matchId }: { matchId: string }) => {
  return (
    <div>
      <ChatPage matchId={matchId}/>
    </div>
  );
};

export default Page;
