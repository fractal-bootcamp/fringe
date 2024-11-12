"use client";

import ChatPage from "@/components/ChatPage";
import useMatch from "@/hooks/useMatch";

// interface ChatMessage {
//   content: string;
//   sender: "user" | "match" | "system";
//   timestamp: Date;
// }

const Page = ({matchId}: {matchId: string}) => {

  //const match = useMatch(matchId);

  return (
    <div>
      {/* <ChatPage match={match} /> */}
      <ChatPage/>
    </div>
  );
};

export default Page;
