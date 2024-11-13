"use client";

import { useParams } from "next/navigation";
import ChatPage from "@/components/ChatPage";
import useMatch from "@/hooks/useMatch";
import { useAuth } from '@clerk/nextjs'
// interface ChatMessage {
//   content: string;
//   sender: "user" | "match" | "system";
//   timestamp: Date;
// }

const Page =  () => {
  const { slug } = useParams();
  const { match } = useMatch(slug as string);
  const { getToken } = useAuth();


  if (!match || !getToken) return <div>Loading...</div>;
  return (
    <div>
      <ChatPage match={match} getToken={getToken} />
    </div>
  );
};

export default Page;