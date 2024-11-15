import type { Meta, StoryObj } from "@storybook/react";

import XChatCard from "../components/XChatCard";

const meta = {
  component: XChatCard,
} satisfies Meta<typeof XChatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messageObjects: [
      { id: "1", sender: "user", content: "Hello" },
      { id: "2", sender: "recipient", content: "Hi" },
    ],
    onSendMessage: () => {},
  },
};
