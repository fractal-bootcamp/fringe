import type { Meta, StoryObj } from "@storybook/react";

import XLikesYouCard from "../components/XLikesYouCard";

const meta = {
  title: "XLikesYouCard",
  component: XLikesYouCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof XLikesYouCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "John Doe",
    image: "https://github.com/shadcn.png",
    goToProfile: () => {},
    onMatch: () => {},
    onUnmatch: () => {},
  },
};
