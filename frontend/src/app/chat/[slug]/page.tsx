"use client";

import { useParams } from "next/navigation";
import XChatCard, { MessageObject } from "@/components/XChatCard";
import useUser from "@/hooks/useUser";
import useMessages from "@/hooks/useMessages";
import storeHeader from "@/stores/storeHeader";
import useMatches from "@/hooks/useMatches";

const Page = () => {
  const { slug } = useParams();
  const { currentUser } = useUser();
  const { matches } = useMatches();

  const match = matches.find((match) => match.id === slug);

  const { handleSendMessage } = useMessages(match?.id || "");

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
      updateHeader={storeHeader.getState().updateHeader}
    />
  );
};

export default Page;
