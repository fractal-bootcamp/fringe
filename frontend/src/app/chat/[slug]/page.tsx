"use client";

import { useParams } from "next/navigation";
import useMatch from "@/hooks/useMatch";
import XChatCard, { MessageObject } from "@/components/XChatCard";
import useUser from "@/hooks/useUser";
import useMessages from "@/hooks/useMessages";

const Page = () => {
  const { slug } = useParams();
  const { currentUser } = useUser();
  const { match } = useMatch(slug as string);
  const { handleSendMessage } = useMessages(match?.id || "");

  console.log("user");
  console.log(currentUser);
  console.log("match");
  console.log(match);

  if (!match || !currentUser) return <div>Loading...</div>;

  const messageObjects: MessageObject[] | null = match.messages.map((msg) => ({
    id: msg.id,
    sender: msg.senderId === currentUser.id ? "user" : "recipient",
    content: msg.content,
  }));

  console.log("messageObjects");
  console.log(messageObjects);

  return (
    <XChatCard
      senderId={currentUser.id}
      matchId={match.id}
      userId={match.users[1].id}
      title={match.users[1].name}
      messageObjects={messageObjects}
      onSendMessage={handleSendMessage}
    />
  );
};

export default Page;
