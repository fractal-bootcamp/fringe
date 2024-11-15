import type { Meta, StoryObj } from "@storybook/react";

import XChatCard from "../components/XChatCard";

const meta = {
  component: XChatCard,
} satisfies Meta<typeof XChatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    senderId: "sender123",
    matchId: "match456",
    userId: "user789",
    title: "Sarah Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    avatarFallback: "SJ",
    messageObjects: [
      { id: "1", sender: "user", content: "Hello" },
      { id: "2", sender: "recipient", content: "Hi" },
    ],
    onSendMessage: () => {},
    updateHeader: (newHeader: string) => console.log("Header updated:", newHeader),
  },
};
