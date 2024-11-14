import type { Meta, StoryObj } from "@storybook/react";

import ChatCard from "../components/XChatCard";

const meta = {
  component: ChatCard,
} satisfies Meta<typeof ChatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
