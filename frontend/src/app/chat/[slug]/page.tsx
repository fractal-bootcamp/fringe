"use client";

import { useParams } from "next/navigation";
import useMatch from "@/hooks/useMatch";
import XChatCard, { MessageObject } from "@/components/XChatCard";
import useUser from "@/hooks/useUser";
import useMessages from "@/hooks/useMessages";

const Page = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const { match } = useMatch(slug as string);

  console.log("user");
  console.log(user);
  console.log("match");
  console.log(match);

  if (!match || !user) return <div>Loading...</div>;

  const { handleSendMessage } = useMessages(match.id);

  const messageObjects: MessageObject[] = match.messages.map((msg) => ({
    id: msg.id,
    sender: msg.senderId === user.id ? "user" : "recipient",
    content: msg.content,
  }));

  console.log("messageObjects");
  console.log(messageObjects);

  return (
    <XChatCard
      senderId={user.id}
      matchId={match.id}
      messageObjects={messageObjects}
      onSendMessage={handleSendMessage}
    />
  );
};

export default Page;
